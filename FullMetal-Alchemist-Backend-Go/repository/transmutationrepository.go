package repository

import (
	"FullMetal-Alchemist-Backend-Go/models"

	"gorm.io/gorm"
)

type TransmutationRepository struct {
	DB *gorm.DB
}

func NewTransmutationRepository(DB *gorm.DB) *TransmutationRepository {
	return &TransmutationRepository{DB: DB}
}

func (R *TransmutationRepository) FindAll() ([]*models.Transmutation, error) {
	var Result []*models.Transmutation
	Error := R.DB.Preload("AlchemicalMaterial").Preload("AlchemicalMaterial.Alchemist").Find(&Result).Error
	return Result, Error
}

func (R *TransmutationRepository) FindById(ID int) (*models.Transmutation, error) {
	var Result *models.Transmutation
	Error := R.DB.Preload("AlchemicalMaterial").Preload("AlchemicalMaterial.Alchemist").First(&Result, ID).Error
	return Result, Error
}

func (R *TransmutationRepository) Save(T *models.Transmutation) (*models.Transmutation, error) {
	if T.ID == 0 {
		if Error := R.DB.Create(T).Error; Error != nil {
			return nil, Error
		}
	} else {
		if Error := R.DB.Model(&models.Transmutation{}).Where("id = ?", T.ID).Updates(T).Error; Error != nil {
			return nil, Error
		}
	}
	var Result models.Transmutation
	if Error := R.DB.Preload("AlchemicalMaterial").Preload("AlchemicalMaterial.Alchemist").First(&Result, T.ID).Error; Error != nil {
		return nil, Error
	}
	return &Result, nil
}

func (R *TransmutationRepository) Delete(T *models.Transmutation) error {
	return R.DB.Delete(T).Error
}
