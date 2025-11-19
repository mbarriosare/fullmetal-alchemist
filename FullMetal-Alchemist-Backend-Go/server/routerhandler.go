package server

import (
	"net/http"

	"github.com/gorilla/mux"
)

func (Server *Server) router() http.Handler {
	Router := mux.NewRouter()
	Router.Use(Server.logger.RequestLogger)
	Router.HandleFunc("/alchemist", Server.HandleAlchemists).Methods(http.MethodGet, http.MethodPost)
	Router.HandleFunc("/alchemist/{id}", Server.HandleAlchemistsWithID).Methods(http.MethodGet, http.MethodPut, http.MethodDelete)
	Router.HandleFunc("/mission", Server.HandleMissions).Methods(http.MethodGet, http.MethodPost)
	Router.HandleFunc("/mission/{id}", Server.HandleMissionsWithID).Methods(http.MethodGet, http.MethodPut, http.MethodDelete)
	Router.HandleFunc("/alchemicalmaterial", Server.HandleAlchemicalMaterials).Methods(http.MethodGet, http.MethodPost)
	Router.HandleFunc("/alchemicalmaterial/{id}", Server.HandleAlchemicalMaterialsWithID).Methods(http.MethodGet, http.MethodPut, http.MethodDelete)
	Router.HandleFunc("/transmutation", Server.HandleTransmutations).Methods(http.MethodGet, http.MethodPost)
	Router.HandleFunc("/transmutation/{id}", Server.HandleTransmutationsWithID).Methods(http.MethodGet, http.MethodPut, http.MethodDelete)
	Router.HandleFunc("/auditory", Server.HandleAuditories).Methods(http.MethodGet, http.MethodPost)
	Router.HandleFunc("/auditory/{id}", Server.HandleAuditoriesWithID).Methods(http.MethodGet, http.MethodPut, http.MethodDelete)
	Router.HandleFunc("/supervisor", Server.HandleGetSupervisors).Methods("GET")
	return Router
}
