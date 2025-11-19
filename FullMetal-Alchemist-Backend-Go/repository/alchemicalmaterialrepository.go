package repository

import (
	"FullMetal-Alchemist-Backend-Go/models"

	"gorm.io/gorm"
)

type AlchemicalMaterialRepository struct {
	DB *gorm.DB
}

func NewAlchemicalMaterialRepository(DB *gorm.DB) *AlchemicalMaterialRepository {
	return &AlchemicalMaterialRepository{DB: DB}
}

func (R *AlchemicalMaterialRepository) FindAll() ([]*models.Material, error) {
	var Result []*models.Material
	Error := R.DB.Preload("Alchemist").Find(&Result).Error
	return Result, Error
}

func (R *AlchemicalMaterialRepository) FindById(ID int) (*models.Material, error) {
	var Result *models.Material
	Error := R.DB.Preload("Alchemist").First(&Result, ID).Error
	return Result, Error
}

func (R *AlchemicalMaterialRepository) Save(M *models.Material) (*models.Material, error) {
	Error := R.DB.Save(M).Error
	return M, Error
}

func (R *AlchemicalMaterialRepository) Delete(M *models.Material) error {
	return R.DB.Delete(M).Error
}
