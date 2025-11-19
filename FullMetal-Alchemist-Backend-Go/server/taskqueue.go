package server

import (
	"FullMetal-Alchemist-Backend-Go/models"
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"os"

	"github.com/hibiken/asynq"
	"github.com/redis/go-redis/v9"
)

func ConvertRarity(R string) float64 {
	switch R {
	case "Muy Comun":
		return 0.5
	case "Comun":
		return 1.2
	case "Poco Comun":
		return 1.5
	case "Raro":
		return 2.0
	case "Epico":
		return 3.0
	case "Legendario":
		return 5.0
	case "Especial":
		return 4.5
	case "Alquimico":
		return 4.0
	case "Muy Raro":
		return 3.5
	}
	return 1.0
}

func ConvertRank(R string) float64 {
	switch R {
	case "Aprendiz":
		return 1.0
	case "Oficial":
		return 1.5
	case "Experto":
		return 2.5
	case "Maestro":
		return 3.5
	case "Coronel":
		return 3.0
	case "Teniente":
		return 2.7
	case "General":
		return 4.0
	case "Mayor":
		return 4.5
	}
	return 1.0
}

func CalculateTransmutation(MaterialRarity float64, AlchemistRank float64) (string, string) {
	Difficulty := MaterialRarity * 2
	Power := float64(AlchemistRank) * 1.5
	BaseResult := Power - float64(Difficulty)

	var Status string
	var Result string
	var ResArray []string

	if BaseResult >= 0 && BaseResult < 1.5 {
		Status = "Fallido"
		ResArray = []string{"Madera Organica", "Carbon Vegetal", "Metal Oxidado", "Tierra Arida"}
		Result = ResArray[rand.Intn(len(ResArray))]
	} else if BaseResult >= 1.5 && BaseResult < 5.0 {
		Status = "Parcialmente Exitoso"
		ResArray = []string{"Metal", "Cristal De Llama", "Acero", "Esencia De Tormenta"}
		Result = ResArray[rand.Intn(len(ResArray))]
	} else if BaseResult >= 5.0 && BaseResult < 9.0 {
		Status = "Estable-Exitoso"
		ResArray = []string{"Sangre De Elemental", "Obsidiana", "Hueso De Dragon", "Cristal Etereo"}
		Result = ResArray[rand.Intn(len(ResArray))]
	} else if BaseResult >= 9.0 && BaseResult < 13.0 {
		Status = "Exitoso"
		ResArray = []string{"Llama Eterna", "Polvo De Estrella", "Metal Celestial", "Piedra Filosofal"}
		Result = ResArray[rand.Intn(len(ResArray))]
	} else {
		Status = "Fallo Total"
		Result = "El Material No Es Apto"
	}
	return Status, Result
}

var RedisClient *redis.Client
var AsynqClient *asynq.Client
var AsynqServer *asynq.Server

func InitRedisTaskQueue() {
	RedisHost := os.Getenv("REDIS_HOST")
	if RedisHost == "" {
		RedisHost = "redis"
	}
	RedisPort := os.Getenv("REDIS_PORT")
	if RedisPort == "" {
		RedisPort = "6379"
	}
	Addr := fmt.Sprintf("%s:%s", RedisHost, RedisPort)
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     Addr,
		Password: "",
		DB:       0,
	})
	_, Error := RedisClient.Ping(context.Background()).Result()
	if Error != nil {
		panic(fmt.Sprintf("Error Conectando A Redis: %v", Error))
	}
	AsynqClient = asynq.NewClient(asynq.RedisClientOpt{
		Addr: Addr,
	})
	AsynqServer = asynq.NewServer(
		asynq.RedisClientOpt{Addr: Addr},
		asynq.Config{
			Concurrency: 10,
		},
	)
}

func EnqueueTransmutationTask(Server *Server, TransmutationID int) error {
	Payload, _ := json.Marshal(map[string]int{"transmutation_id": TransmutationID})
	Task := asynq.NewTask("transmutation:process", Payload)
	_, Error := AsynqClient.Enqueue(Task)
	if Error != nil {
		return fmt.Errorf("error encolando tarea: %v", Error)
	}
	fmt.Printf("Transmutation ID %d Enqueued Correctly\n", TransmutationID)
	return nil
}

func HandleTransmutationTask(Server *Server) func(Context context.Context, Task *asynq.Task) error {
	return func(Context context.Context, Task *asynq.Task) error {
		var Payload map[string]int
		if Error := json.Unmarshal(Task.Payload(), &Payload); Error != nil {
			return fmt.Errorf("error decoding task payload: %v", Error)
		}
		TransmutationID := Payload["transmutation_id"]
		Transmutation, Error := Server.TransmutationsRepository.FindById(TransmutationID)
		if Error != nil || Transmutation == nil {
			return fmt.Errorf("transmutation ID %d not found: %v", TransmutationID, Error)
		}
		Material, Error := Server.AlchemicalMaterialsRepository.FindById(int(Transmutation.AlchemicalMaterialID))
		if Error != nil || Material == nil || Material.Alchemist == nil {
			return fmt.Errorf("material or alchemist not found for transmutation ID %d", TransmutationID)
		}
		Rarity := ConvertRarity(Material.Rarity)
		Rank := ConvertRank(Material.Alchemist.Rank)
		Status, ResultT := CalculateTransmutation(Rarity, Rank)
		Transmutation.Status = Status
		Transmutation.Result = ResultT
		_, Error = Server.TransmutationsRepository.Save(Transmutation)
		if Error != nil {
			return fmt.Errorf("error updating transmutation ID %d: %v", TransmutationID, Error)
		}
		Auditory := &models.Auditory{
			TransmutationID: uint(TransmutationID),
			Description:     fmt.Sprintf("Transmutacion Con ID %d Procesada Y Aceptada Exitosamente.", TransmutationID),
			Status:          "Exitoso",
		}
		_, Error = Server.AuditoriesRepository.Save(Auditory)
		if Error != nil {
			return fmt.Errorf("error saving audit for transmutation ID %d: %v", TransmutationID, Error)
		}
		fmt.Printf("Transmutation ID %d successfully processed\n", TransmutationID)
		return nil
	}
}

func StartTaskProcessing(Server *Server) {
	mux := asynq.NewServeMux()
	mux.HandleFunc("transmutation:process", HandleTransmutationTask(Server))

	fmt.Println("Task Processor Initialized")
	go AsynqServer.Run(mux)
}
