package repository

import (
	"FullMetal-Alchemist-Backend-Go/models"

	"gorm.io/gorm"
)

type AuditoryRepository struct {
	DB *gorm.DB
}

func NewAuditoryRepository(DB *gorm.DB) *AuditoryRepository {
	return &AuditoryRepository{DB: DB}
}

func (R *AuditoryRepository) FindAll() ([]*models.Auditory, error) {
	var Result []*models.Auditory
	Error := R.DB.Preload("Transmutation").Preload("Transmutation.AlchemicalMaterial").Preload("Transmutation.AlchemicalMaterial.Alchemist").Find(&Result).Error
	if Error != nil {
		return nil, Error
	}
	return Result, Error
}

func (R *AuditoryRepository) FindById(ID int) (*models.Auditory, error) {
	var Result *models.Auditory
	Error := R.DB.Preload("Transmutation").Preload("Transmutation.AlchemicalMaterial").Preload("Transmutation.AlchemicalMaterial.Alchemist").Find(&Result).Error
	return Result, Error
}

func (R *AuditoryRepository) Save(A *models.Auditory) (*models.Auditory, error) {
	if A.ID == 0 {
		if Error := R.DB.Create(A).Error; Error != nil {
			return nil, Error
		}
	} else {
		if Error := R.DB.Model(&models.Auditory{}).Where("id = ?", A.ID).Updates(A).Error; Error != nil {
			return nil, Error
		}
	}
	var Result models.Auditory
	if Error := R.DB.Preload("Transmutation").Preload("Transmutation.AlchemicalMaterial").Preload("Transmutation.AlchemicalMaterial.Alchemist").Find(&Result).Error; Error != nil {
		return nil, Error
	}
	return &Result, nil
}

func (R *AuditoryRepository) Delete(A *models.Auditory) error {
	return R.DB.Delete(A).Error
}
