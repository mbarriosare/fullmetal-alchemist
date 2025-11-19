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

func (Server *Server) HandleAlchemicalMaterials(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetAlchemicalMaterials(H, B)
		return
	case http.MethodPost:
		Server.HandleCreateAlchemicalMaterial(H, B)
		return
	}
}

func (Server *Server) HandleAlchemicalMaterialsWithID(H http.ResponseWriter, B *http.Request) {
	switch B.Method {
	case http.MethodGet:
		Server.HandleGetAlchemicalMaterialByID(H, B)
		return
	case http.MethodPut:
		Server.HandleEditAlchemicalMaterial(H, B)
		return
	case http.MethodDelete:
		Server.HandleDeleteAlchemicalMaterial(H, B)
		return
	}
}

func (Server *Server) HandleGetAlchemicalMaterials(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	Result := []*api.AlchemicalMaterialResponseDTO{}
	AlchemicalMaterials, Error := Server.AlchemicalMaterialsRepository.FindAll()
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	for _, AlchemicalMaterial := range AlchemicalMaterials {
		Result = append(Result, AlchemicalMaterial.ConvertToAlchemicalMaterialResponseDTO())
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

func (Server *Server) HandleGetAlchemicalMaterialByID(H http.ResponseWriter, B *http.Request) {
	Init := time.Now()
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	AlchemicalMaterial, Error := Server.AlchemicalMaterialsRepository.FindById(int(ID))
	if AlchemicalMaterial == nil && Error == nil {
		Server.HandleError(H, http.StatusNotFound, B.URL.Path, fmt.Errorf("material with id %d not found", ID))
		return
	}
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	Response := &api.AlchemicalMaterialResponseDTO{
		Material_Name:           AlchemicalMaterial.Name,
		Material_Description:    AlchemicalMaterial.Description,
		Material_Quantity:       AlchemicalMaterial.Quantity,
		Material_Rarity:         AlchemicalMaterial.Rarity,
		Material_CollectionDate: AlchemicalMaterial.CreatedAt.String(),
	}
	ResponseJSON, Error := json.Marshal(Response)
	if Error != nil {
		Server.HandleError(H, http.StatusInternalServerError, B.URL.Path, Error)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.Write(ResponseJSON)
	Server.logger.Info(http.StatusOK, B.URL.Path, Init)
}

func (Server *Server) HandleCreateAlchemicalMaterial(H http.ResponseWriter, B *http.Request) {
	var AM api.AlchemicalMaterialRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&AM)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	AlchemicalMaterial := &models.Material{
		AlchemistID: uint(AM.Alchemist_ID),
		Name:        AM.Material_Name,
		Description: AM.Material_Description,
		Quantity:    AM.Material_Quantity,
		Rarity:      AM.Material_Rarity,
	}
	AlchemicalMaterial, Error = Server.AlchemicalMaterialsRepository.Save(AlchemicalMaterial)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Response := &api.AlchemicalMaterialResponseDTO{
		ID:                      int(AlchemicalMaterial.ID),
		Material_Name:           AlchemicalMaterial.Name,
		Material_Description:    AlchemicalMaterial.Description,
		Material_Quantity:       AlchemicalMaterial.Quantity,
		Material_Rarity:         AlchemicalMaterial.Rarity,
		Material_CollectionDate: AlchemicalMaterial.CreatedAt.String(),
	}
	Result, Error := json.Marshal(Response)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.Header().Set("Content-Type", "application/json")
	H.WriteHeader(http.StatusCreated)
	H.Write(Result)
}

func (Server *Server) HandleEditAlchemicalMaterial(H http.ResponseWriter, B *http.Request) {
	var AM api.AlchemicalMaterialRequestDTO
	Error := json.NewDecoder(B.Body).Decode(&AM)
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
	AlchemicalMaterial, Error := Server.AlchemicalMaterialsRepository.FindById(int(ID))
	if AlchemicalMaterial == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	AlchemicalMaterial.Name = AM.Material_Name
	AlchemicalMaterial.Description = AM.Material_Description
	AlchemicalMaterial.Quantity = AM.Material_Quantity
	AlchemicalMaterial.Rarity = AM.Material_Rarity
	AlchemicalMaterial, Error = Server.AlchemicalMaterialsRepository.Save(AlchemicalMaterial)
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	Response := &api.AlchemicalMaterialResponseDTO{
		Material_Name:           AlchemicalMaterial.Name,
		Material_Description:    AlchemicalMaterial.Description,
		Material_Quantity:       AlchemicalMaterial.Quantity,
		Material_Rarity:         AlchemicalMaterial.Rarity,
		Material_CollectionDate: AlchemicalMaterial.CreatedAt.String(),
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

func (Server *Server) HandleDeleteAlchemicalMaterial(H http.ResponseWriter, B *http.Request) {
	vars := mux.Vars(B)
	ID, Error := strconv.ParseInt(vars["id"], 10, 32)
	if Error != nil {
		H.WriteHeader(http.StatusBadRequest)
		return
	}
	AlchemicalMaterial, Error := Server.AlchemicalMaterialsRepository.FindById(int(ID))
	if AlchemicalMaterial == nil {
		H.WriteHeader(http.StatusNotFound)
		return
	}
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	if Error := Server.AlchemicalMaterialsRepository.Delete(AlchemicalMaterial); Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		return
	}
	H.WriteHeader(http.StatusNoContent)
}
