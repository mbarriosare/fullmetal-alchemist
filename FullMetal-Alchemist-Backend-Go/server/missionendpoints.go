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

func (Server *Server) HandleMissions(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetMissions(H, B)
		return
	case http.MethodPost:
		Server.HandleCreateMission(H, B)
		return
	}
}

func (Server *Server) HandleMissionsWithID(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetMissionByID(H, B)
		return
	case http.MethodPut:
		Server.HandleEditMission(H, B)
		return
	case http.MethodDelete:
		Server.HandleDeleteMission(H, B)
		return
	}
}

func (Server *Server) HandleGetMissions(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	Result := []*api.MissionResponseDTO{}
	Missions, Error := Server.MissionsRepository.FindAll()
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	for _, Mission := range Missions {
		Result = append(Result, Mission.ConvertToMissionResponseDTO())
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

func (Server *Server) HandleGetMissionByID(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	Mission, Error := Server.MissionsRepository.FindById(int(ID))
	if Mission == nil && Error == nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, fmt.Errorf("mission with id %d cannot be found", ID))
		return
	}
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	Response := &api.MissionResponseDTO{
		Mission_Title:        Mission.Title,
		Mission_Status:       Mission.Status,
		Mission_Description:  Mission.Description,
		Mission_CreationDate: Mission.CreatedAt.String(),
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

func (Server *Server) HandleCreateMission(H http.ResponseWriter, B *http.Request) {
	var M api.MissionRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&M)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Mission := &models.Mission{
		AlchemistID: uint(M.Alchemist_ID),
		Title:       M.Mission_Title,
		Status:      M.Mission_Status,
		Description: M.Mission_Description,
	}
	Mission, Error = Server.MissionsRepository.Save(Mission)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	MissionResponse := &api.MissionResponseDTO{
		ID:                   int(Mission.ID),
		Mission_Title:        Mission.Title,
		Mission_Status:       Mission.Status,
		Mission_Description:  Mission.Description,
		Mission_CreationDate: Mission.CreatedAt.String(),
	}
	Result, Error := json.Marshal(MissionResponse)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusCreated)
	H.Write(Result)
}

func (Server *Server) HandleEditMission(H http.ResponseWriter, B *http.Request) {
	var M api.MissionRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&M)
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
	Mission, Error := Server.MissionsRepository.FindById(int(ID))
	if Mission == nil && Error == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Mission.Title = M.Mission_Title
	Mission.Status = M.Mission_Status
	Mission.Description = M.Mission_Description
	Mission, Error = Server.MissionsRepository.Save(Mission)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	MissionResponse := &api.MissionResponseDTO{
		Mission_Title:        Mission.Title,
		Mission_Status:       Mission.Status,
		Mission_Description:  Mission.Description,
		Mission_CreationDate: Mission.CreatedAt.String(),
	}
	Result, Error := json.Marshal(MissionResponse)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusAccepted)
	H.Write(Result)
}

func (Server *Server) HandleDeleteMission(H http.ResponseWriter, B *http.Request) {
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Mission, Error := Server.MissionsRepository.FindById(int(ID))
	if Mission == nil && Error == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Error = Server.MissionsRepository.Delete(Mission)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.WriteHeader(http.StatusNoContent)
}
