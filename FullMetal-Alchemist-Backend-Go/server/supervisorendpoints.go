package server

import (
	"encoding/json"
	"net/http"
)

func (Server *Server) HandleGetSupervisors(H http.ResponseWriter, B *http.Request) {
	Supervisors, Error := Server.SupervisorsRepository.FindAll()
	if Error != nil {
		H.WriteHeader(http.StatusInternalServerError)
		H.Write([]byte("Error Retrieving The Supervisors"))
		return
	}
	H.Header().Set("Content-Type", "application/json")
	json.NewEncoder(H).Encode(Supervisors)
}
