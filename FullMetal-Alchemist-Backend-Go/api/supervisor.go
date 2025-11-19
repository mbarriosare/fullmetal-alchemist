package api

type SupervisorRequestDTO struct {
	Supervisor_ID       int    `json:"Supervisor_ID"`
	Supervisor_Name     string `json:"Supervisor_Name"`
	Supervisor_Password string `json:"Supervisor_Password"`
}

type SupervisorResponseDTO struct {
	Supervisor_ID       int    `json:"Supervisor_ID"`
	Supervisor_Name     string `json:"Supervisor_Name"`
	Supervisor_Password string `json:"Supervisor_Password"`
}
