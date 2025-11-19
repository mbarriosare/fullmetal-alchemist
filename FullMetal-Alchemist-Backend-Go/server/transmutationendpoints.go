package server

import (
	"FullMetal-Alchemist-Backend-Go/api"
	"FullMetal-Alchemist-Backend-Go/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

func (Server *Server) HandleTransmutations(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetTransmutations(H, B)
		return
	case http.MethodPost:
		Server.HandleCreateTransmutation(H, B)
		return
	}
}

func (Server *Server) HandleTransmutationsWithID(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetTransmutationByID(H, B)
		return
	case http.MethodPut:
		Server.HandleEditTransmutation(H, B)
		return
	case http.MethodDelete:
		Server.HandleDeleteTransmutation(H, B)
		return
	}
}

func (Server *Server) HandleGetTransmutations(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	Result := []*api.TransmutationResponseDTO{}
	Transmutations, Error := Server.TransmutationsRepository.FindAll()
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	for _, Transmutation := range Transmutations {
		Result = append(Result, Transmutation.ConvertToTransmutationResponseDTO())
	}
	Response, Error := json.Marshal(Result)
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.Write(Response)
	Server.logger.Info(http.StatusOK, B.URL.Path, Init)
}

func (Server *Server) HandleGetTransmutationByID(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		Server.HandleError(H, http.StatusBadRequest, B.URL.Path, Error)
		return
	}
	Transmutation, Error := Server.TransmutationsRepository.FindById(int(ID))
	if Transmutation == nil && Error == nil {
		Server.HandleError(H, http.StatusNotFound, B.URL.Path, fmt.Errorf("transmutation %d not found", ID))
		return
	}
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	Response := &api.TransmutationResponseDTO{
		Transmutation_Description:   Transmutation.Description,
		Transmutation_Status:        Transmutation.Status,
		Transmutation_Result:        Transmutation.Result,
		Transmutation_RequestedDate: Transmutation.CreatedAt.String(),
	}
	ResponseAlt, Error := json.Marshal(Response)
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.Write(ResponseAlt)
	Server.logger.Info(http.StatusOK, B.URL.Path, Init)
}

func (Server *Server) HandleCreateTransmutation(H http.ResponseWriter, B *http.Request) {
	var T api.TransmutationRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&T)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Material, Error := Server.AlchemicalMaterialsRepository.FindById(T.AlchemicalMaterialID)
	if Error != nil || Material == nil || Material.Alchemist == nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Transmutation := &models.Transmutation{
		AlchemicalMaterialID: uint(T.AlchemicalMaterialID),
		Description:          T.Transmutation_Description,
		Status:               "Pendiente",
		Result:               "",
	}
	Error = Server.TransmutationsRepository.DB.Create(Transmutation).Error
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	if Error := EnqueueTransmutationTask(Server, int(Transmutation.ID)); Error != nil {
		fmt.Printf("Error Enqueuing Transmutation: %v\n", Error)
	}
	Response := &api.TransmutationResponseDTO{
		ID:                          int(Transmutation.ID),
		Transmutation_Description:   Transmutation.Description,
		Transmutation_Status:        Transmutation.Status,
		Transmutation_Result:        Transmutation.Result,
		Transmutation_RequestedDate: Transmutation.CreatedAt.String(),
	}
	Result, err := json.Marshal(Response)
	if err != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusCreated)
	H.Write(Result)
}

func (Server *Server) HandleEditTransmutation(H http.ResponseWriter, B *http.Request) {
	var T api.TransmutationRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&T)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Transmutation, Error := Server.TransmutationsRepository.FindById(int(ID))
	if Transmutation == nil && Error == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Transmutation.Description = T.Transmutation_Description
	Transmutation, Error = Server.TransmutationsRepository.Save(Transmutation)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Response := &api.TransmutationResponseDTO{
		ID:                          int(Transmutation.ID),
		Transmutation_Description:   Transmutation.Description,
		Transmutation_Status:        Transmutation.Status,
		Transmutation_Result:        Transmutation.Result,
		Transmutation_RequestedDate: Transmutation.CreatedAt.String(),
	}
	Result, Error := json.Marshal(Response)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusAccepted)
	H.Write(Result)
}

func (Server *Server) HandleDeleteTransmutation(H http.ResponseWriter, B *http.Request) {
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Transmutation, Error := Server.TransmutationsRepository.FindById(int(ID))
	if Transmutation == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Error = Server.TransmutationsRepository.Delete(Transmutation)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.WriteHeader(http.StatusNoContent)
}
