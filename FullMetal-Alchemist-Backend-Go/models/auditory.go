package models

import (
	"FullMetal-Alchemist-Backend-Go/api"

	"gorm.io/gorm"
)

type Auditory struct {
	gorm.Model
	Description     string         `json:"Description"`
	Status          string         `json:"Status"`
	TransmutationID uint           `json:"Transmutation_ID"`
	Transmutation   *Transmutation `gorm:"foreignKey:TransmutationID"`
}

func (V *Auditory) ConvertToAuditoryResponseDTO() *api.AuditoryResponseDTO {
	return &api.AuditoryResponseDTO{
		Transmutation:         V.Transmutation.ConvertToTransmutationResponseDTO(),
		ID:                    int(V.ID),
		Auditory_Description:  V.Description,
		Auditory_Status:       V.Status,
		Auditory_CreationDate: V.CreatedAt.String(),
	}
}
