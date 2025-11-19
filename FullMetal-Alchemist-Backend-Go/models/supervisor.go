package models

import (
	"FullMetal-Alchemist-Backend-Go/api"

	"gorm.io/gorm"
)

type Supervisor struct {
	gorm.Model
	Supervisor_ID       uint
	Supervisor_Name     string
	Supervisor_Password string
}

func (S *Supervisor) ConvertToSupervisorResponseDTO() *api.SupervisorResponseDTO {
	return &api.SupervisorResponseDTO{
		Supervisor_ID:   int(S.Supervisor_ID),
		Supervisor_Name: S.Supervisor_Name,
	}
}
