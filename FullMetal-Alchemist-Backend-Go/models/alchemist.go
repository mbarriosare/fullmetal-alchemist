package models

import (
	"FullMetal-Alchemist-Backend-Go/api"

	"gorm.io/gorm"
)

type Alchemist struct {
	gorm.Model
	ID         uint
	Name       string
	Speciality string
	Rank       string
	Password   string
}

func (A *Alchemist) ConvertToAlchemistResponseDTO() *api.AlchemistResponseDTO {
	return &api.AlchemistResponseDTO{
		ID:                     int(A.ID),
		Full_Name:              A.Name,
		Alchemist_Speciality:   A.Speciality,
		Alchemist_Rank:         A.Rank,
		Alchemist_Password:     A.Password,
		Alchemist_CreationDate: A.CreatedAt.String(),
	}
}
