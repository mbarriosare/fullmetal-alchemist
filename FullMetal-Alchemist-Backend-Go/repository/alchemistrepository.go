package repository

import (
	"FullMetal-Alchemist-Backend-Go/models"

	"gorm.io/gorm"
)

type AlchemistRepository struct {
	DB *gorm.DB
}

func NewAlchemistRepository(DB *gorm.DB) *AlchemistRepository {
	return &AlchemistRepository{DB: DB}
}

func (R *AlchemistRepository) FindAll() ([]*models.Alchemist, error) {
	var Result []*models.Alchemist
	Error := R.DB.Find(&Result).Error
	return Result, Error
}

func (R *AlchemistRepository) FindById(ID int) (*models.Alchemist, error) {
	var Result *models.Alchemist
	Error := R.DB.First(&Result, ID).Error
	return Result, Error
}

func (R *AlchemistRepository) Save(A *models.Alchemist) (*models.Alchemist, error) {
	Error := R.DB.Save(A).Error
	return A, Error
}

func (R *AlchemistRepository) Delete(A *models.Alchemist) error {
	return R.DB.Delete(A).Error
}
