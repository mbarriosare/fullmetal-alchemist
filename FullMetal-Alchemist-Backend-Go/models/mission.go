package models

import (
	"FullMetal-Alchemist-Backend-Go/api"

	"gorm.io/gorm"
)

type Mission struct {
	gorm.Model
	Title       string     `json:"Title"`
	Status      string     `json:"Status"`
	Description string     `json:"Description"`
	AlchemistID uint       `json:"Alchemist_ID"`
	Alchemist   *Alchemist `gorm:"foreignKey:AlchemistID"`
}

func (M *Mission) ConvertToMissionResponseDTO() *api.MissionResponseDTO {
	return &api.MissionResponseDTO{
		Alchemist:            M.Alchemist.ConvertToAlchemistResponseDTO(),
		ID:                   int(M.ID),
		Mission_Title:        M.Title,
		Mission_Status:       M.Status,
		Mission_Description:  M.Description,
		Mission_CreationDate: M.CreatedAt.String(),
	}
}
