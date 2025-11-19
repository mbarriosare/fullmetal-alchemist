package server

import (
	"FullMetal-Alchemist-Backend-Go/api"
	"encoding/json"
	"net/http"
)

var statusMap = map[int]string{
	400: "Bad Request",
	404: "Not Found",
	405: "Method Not Allowed",
	500: "Internal Server Error",
	200: "OK",
	201: "Created",
	202: "Accepted",
	204: "No Content",
}

func (Server *Server) HandleError(e http.ResponseWriter, StatusCode int, Path string, Reason error) {
	var ErrorResponse api.ErrorResponse
	ErrorResponse.Status = StatusCode
	ErrorResponse.Message = Reason.Error()
	ErrorResponse.Description = statusMap[StatusCode]
	Response, Error := json.Marshal(ErrorResponse)
	if Error != nil {
		Server.HandleError(e, http.StatusInternalServerError, Path, Error)
	}
	e.Header().Set("Content-Type", "application/json")
	e.WriteHeader(StatusCode)
	e.Write(Response)
	Server.logger.Error(StatusCode, Path, Reason)
}
