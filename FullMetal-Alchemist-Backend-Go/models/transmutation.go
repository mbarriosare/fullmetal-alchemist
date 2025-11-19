package models

import (
	"FullMetal-Alchemist-Backend-Go/api"

	"gorm.io/gorm"
)

type Transmutation struct {
	gorm.Model
	Description          string    `json:"Description"`
	Status               string    `json:"Status"`
	Result               string    `json:"Result"`
	AlchemicalMaterialID uint      `json:"AlchemicalMaterial_ID"`
	AlchemicalMaterial   *Material `gorm:"foreignKey:AlchemicalMaterialID"`
}

func (T *Transmutation) ConvertToTransmutationResponseDTO() *api.TransmutationResponseDTO {
	return &api.TransmutationResponseDTO{
		AlchemicalMaterial:          T.AlchemicalMaterial.ConvertToAlchemicalMaterialResponseDTO(),
		ID:                          int(T.ID),
		Transmutation_Description:   T.Description,
		Transmutation_Status:        T.Status,
		Transmutation_Result:        T.Result,
		Transmutation_RequestedDate: T.CreatedAt.String(),
	}
}
