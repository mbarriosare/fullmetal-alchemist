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

func (Server *Server) HandleAuditories(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetAuditories(H, B)
		return
	case http.MethodPost:
		Server.HandleCreateAuditory(H, B)
		return
	}
}

func (Server *Server) HandleAuditoriesWithID(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetAuditoryByID(H, B)
		return
	case http.MethodPut:
		Server.HandleEditAuditory(H, B)
		return
	case http.MethodDelete:
		Server.HandleDeleteAuditory(H, B)
		return
	}
}

func (Server *Server) HandleGetAuditories(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	Result := []*api.AuditoryResponseDTO{}
	Auditories, Error := Server.AuditoriesRepository.FindAll()
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	for _, Auditory := range Auditories {
		Result = append(Result, Auditory.ConvertToAuditoryResponseDTO())
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

func (Server *Server) HandleGetAuditoryByID(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		Server.HandleError(H, http.StatusBadRequest, B.URL.Path, Error)
		return
	}
	Auditory, Error := Server.AuditoriesRepository.FindById(int(ID))
	if Auditory == nil && Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, fmt.Errorf("auditory with id %d cannot be found", ID))
		return
	}
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	Response := &api.AuditoryResponseDTO{
		Auditory_Description:  Auditory.Description,
		Auditory_Status:       Auditory.Status,
		Auditory_CreationDate: Auditory.CreatedAt.String(),
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

func (Server *Server) HandleCreateAuditory(H http.ResponseWriter, B *http.Request) {
	var AD api.AuditoryRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&AD)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Auditory := &models.Auditory{
		TransmutationID: uint(AD.TransmutationID),
		Description:     AD.Auditory_Description,
		Status:          AD.Auditory_Status,
	}
	Auditory, Error = Server.AuditoriesRepository.Save(Auditory)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	AuditoryResponse := &api.AuditoryResponseDTO{
		ID:                    int(Auditory.ID),
		Auditory_Description:  Auditory.Description,
		Auditory_Status:       Auditory.Status,
		Auditory_CreationDate: Auditory.CreatedAt.String(),
	}
	Result, Error := json.Marshal(AuditoryResponse)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusCreated)
	H.Write(Result)
}

func (Server *Server) HandleEditAuditory(H http.ResponseWriter, B *http.Request) {
	var AD api.AuditoryRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&AD)
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
	Auditory, Error := Server.AuditoriesRepository.FindById(int(ID))
	if Auditory == nil && Error == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Auditory.Description = AD.Auditory_Description
	Auditory.Status = AD.Auditory_Status
	Auditory, Error = Server.AuditoriesRepository.Save(Auditory)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	AuditoryResponse := &api.AuditoryResponseDTO{
		Auditory_Description:  Auditory.Description,
		Auditory_Status:       Auditory.Status,
		Auditory_CreationDate: Auditory.CreatedAt.String(),
	}
	Result, Error := json.Marshal(AuditoryResponse)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusAccepted)
	H.Write(Result)
}

func (Server *Server) HandleDeleteAuditory(H http.ResponseWriter, B *http.Request) {
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Auditory, Error := Server.AuditoriesRepository.FindById(int(ID))
	if Auditory == nil && Error == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Error = Server.AuditoriesRepository.Delete(Auditory)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.WriteHeader(http.StatusNoContent)
}
