package server

import (
	"FullMetal-Alchemist-Backend-Go/logger"
	"FullMetal-Alchemist-Backend-Go/models"
	"FullMetal-Alchemist-Backend-Go/repository"
	"FullMetal-Alchemist-Backend-Go/setup"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Server struct {
	DB                            *gorm.DB
	SetUp                         *setup.Setup
	Handler                       http.Handler
	AlchemistsRepository          *repository.AlchemistRepository
	MissionsRepository            *repository.MissionRepository
	AlchemicalMaterialsRepository *repository.AlchemicalMaterialRepository
	TransmutationsRepository      *repository.TransmutationRepository
	AuditoriesRepository          *repository.AuditoryRepository
	SupervisorsRepository         *repository.SupervisorRepository
	logger                        *logger.Logger
}

func NewServer() *Server {
	Server := &Server{
		logger: logger.NewLogger(),
	}
	var Setup setup.Setup
	SetupFile, Error := os.ReadFile("setup/setup.json")
	if Error != nil {
		Server.logger.Fatal(Error)
	}
	Error = json.Unmarshal(SetupFile, &Setup)
	if Error != nil {
		Server.logger.Fatal(Error)
	}
	Server.SetUp = &Setup
	return Server
}

func (Server *Server) StartServer() {
	fmt.Println("Base De Datos.")
	Server.initDB()
	fmt.Println("Configuracion De CORS.")
	HandleObject := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"}),
	)
	fmt.Println("Mux")
	ServerProps := &http.Server{
		Addr:    Server.SetUp.Address,
		Handler: HandleObject(Server.router()),
	}
	fmt.Println("Puerto Activo: ", Server.SetUp.Address)
	if Error := ServerProps.ListenAndServe(); Error != nil {
		Server.logger.Fatal(Error)
	}
}

func (Server *Server) initDB() {
	switch Server.SetUp.DataBase {
	case "sqlite":
		db, Error := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
		if Error != nil {
			Server.logger.Fatal(Error)
		}
		Server.DB = db

	case "postgres":
		PostgresProps := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("POSTGRES_HOST"),
			os.Getenv("POSTGRES_USER"),
			os.Getenv("POSTGRES_PASSWORD"),
			os.Getenv("POSTGRES_DB"),
		)
		db, Error := gorm.Open(postgres.Open(PostgresProps), &gorm.Config{})
		if Error != nil {
			Server.logger.Fatal(Error)
		}
		Server.DB = db
	}

	fmt.Println("Aplicando Migraciones Para La Base De Datos")
	Server.DB.AutoMigrate(&models.Alchemist{}, &models.Mission{}, &models.Material{}, &models.Transmutation{}, &models.Auditory{}, &models.Supervisor{})

	Server.AlchemistsRepository = repository.NewAlchemistRepository(Server.DB)
	Server.MissionsRepository = repository.NewMissionRepository(Server.DB)
	Server.AlchemicalMaterialsRepository = repository.NewAlchemicalMaterialRepository(Server.DB)
	Server.TransmutationsRepository = repository.NewTransmutationRepository(Server.DB)
	Server.AuditoriesRepository = repository.NewAuditoryRepository(Server.DB)
	Server.SupervisorsRepository = repository.NewSupervisors(Server.DB)
	Server.CreateSupervisors()
}

func (Server *Server) CreateSupervisors() {
	Supervisors := []models.Supervisor{
		{
			Supervisor_ID:       1,
			Supervisor_Name:     "Roy Mustang",
			Supervisor_Password: "RoyMustangFlame345",
		},
		{
			Supervisor_ID:       2,
			Supervisor_Name:     "Izumi Curtis",
			Supervisor_Password: "IzumiCurtisAlchemist345",
		},
		{
			Supervisor_ID:       3,
			Supervisor_Name:     "King Bradley",
			Supervisor_Password: "KingBradleyArmy567",
		},
		{
			Supervisor_ID:       4,
			Supervisor_Name:     "Maes Hughes",
			Supervisor_Password: "MaesHughesFlameAlt345",
		},
		{
			Supervisor_ID:       5,
			Supervisor_Name:     "Riza Hawkeye",
			Supervisor_Password: "RizaHawkeye098",
		},
	}
	for _, S := range Supervisors {
		var Supervisor models.Supervisor
		Error := Server.DB.Where("Supervisor_ID = ?", S.Supervisor_ID).First(&Supervisor).Error
		if Error == gorm.ErrRecordNotFound {
			Server.DB.Create(&S)
			fmt.Println("Created Supervisor", S.Supervisor_Name)
		}
	}
}
