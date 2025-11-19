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

func (Server *Server) HandleAlchemists(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetAlchemists(H, B)
		return
	case http.MethodPost:
		Server.HandleCreateAlchemist(H, B)
		return
	}
}

func (Server *Server) HandleAlchemistsWithID(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetAlchemistByID(H, B)
		return
	case http.MethodPut:
		Server.HandleEditAlchemist(H, B)
		return
	case http.MethodDelete:
		Server.HandleDeleteAlchemist(H, B)
		return
	}
}

func (Server *Server) HandleGetAlchemists(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	Result := []*api.AlchemistResponseDTO{}
	Alchemists, Error := Server.AlchemistsRepository.FindAll()
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	for _, Alchemist := range Alchemists {
		Result = append(Result, Alchemist.ConvertToAlchemistResponseDTO())
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

func (Server *Server) HandleGetAlchemistByID(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	Alchemist, Error := Server.AlchemistsRepository.FindById(int(ID))
	if Alchemist == nil && Error == nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, fmt.Errorf("alchemist with id %d cannot be found", ID))
		return
	}
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	Response := &api.AlchemistResponseDTO{
		ID:                     int(Alchemist.ID),
		Full_Name:              Alchemist.Name,
		Alchemist_Speciality:   Alchemist.Speciality,
		Alchemist_Rank:         Alchemist.Rank,
		Alchemist_Password:     Alchemist.Password,
		Alchemist_CreationDate: Alchemist.CreatedAt.String(),
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

func (Server *Server) HandleCreateAlchemist(H http.ResponseWriter, B *http.Request) {
	var A api.AlchemistRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&A)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Alchemist := &models.Alchemist{
		Name:       A.Full_Name,
		Speciality: A.Alchemist_Speciality,
		Rank:       A.Alchemist_Rank,
		Password:   A.Alchemist_Password,
	}
	Alchemist, Error = Server.AlchemistsRepository.Save(Alchemist)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	AlchemistResponse := &api.AlchemistResponseDTO{
		ID:                     int(Alchemist.ID),
		Full_Name:              Alchemist.Name,
		Alchemist_Speciality:   Alchemist.Speciality,
		Alchemist_Rank:         Alchemist.Rank,
		Alchemist_Password:     Alchemist.Password,
		Alchemist_CreationDate: Alchemist.CreatedAt.String(),
	}
	Result, Error := json.Marshal(AlchemistResponse)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusCreated)
	H.Write(Result)
}

func (Server *Server) HandleEditAlchemist(H http.ResponseWriter, B *http.Request) {
	var A api.AlchemistRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&A)
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
	Alchemist, Error := Server.AlchemistsRepository.FindById(int(ID))
	if Alchemist == nil && Error == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Alchemist.Name = A.Full_Name
	Alchemist.Speciality = A.Alchemist_Speciality
	Alchemist.Rank = A.Alchemist_Rank
	Alchemist.Password = A.Alchemist_Password
	Alchemist, Error = Server.AlchemistsRepository.Save(Alchemist)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	AlchemistResponse := &api.AlchemistResponseDTO{
		ID:                     int(Alchemist.ID),
		Full_Name:              Alchemist.Name,
		Alchemist_Speciality:   Alchemist.Speciality,
		Alchemist_Rank:         Alchemist.Rank,
		Alchemist_Password:     Alchemist.Password,
		Alchemist_CreationDate: Alchemist.CreatedAt.String(),
	}
	Result, Error := json.Marshal(AlchemistResponse)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusAccepted)
	H.Write(Result)
}

func (Server *Server) HandleDeleteAlchemist(H http.ResponseWriter, B *http.Request) {
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	Alchemist, Error := Server.AlchemistsRepository.FindById(int(ID))
	if Alchemist == nil && Error == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Error = Server.AlchemistsRepository.Delete(Alchemist)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.WriteHeader(http.StatusNoContent)
}
