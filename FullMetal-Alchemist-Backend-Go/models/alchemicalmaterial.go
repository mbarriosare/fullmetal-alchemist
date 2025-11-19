package models

import (
	"FullMetal-Alchemist-Backend-Go/api"

	"gorm.io/gorm"
)

type Material struct {
	gorm.Model
	Name        string     `json:"Name"`
	Description string     `json:"Description"`
	Quantity    int        `json:"Quantity"`
	Rarity      string     `json:"Rarity"`
	AlchemistID uint       `json:"Alchemist_ID"`
	Alchemist   *Alchemist `gorm:"foreignKey:AlchemistID"`
}

func (N *Material) ConvertToAlchemicalMaterialResponseDTO() *api.AlchemicalMaterialResponseDTO {
	return &api.AlchemicalMaterialResponseDTO{
		Alchemist:               N.Alchemist.ConvertToAlchemistResponseDTO(),
		ID:                      int(N.ID),
		Material_Name:           N.Name,
		Material_Description:    N.Description,
		Material_Quantity:       N.Quantity,
		Material_Rarity:         N.Rarity,
		Material_CollectionDate: N.CreatedAt.String(),
	}
}
