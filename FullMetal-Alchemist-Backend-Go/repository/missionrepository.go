package repository

import (
	"FullMetal-Alchemist-Backend-Go/models"

	"gorm.io/gorm"
)

type MissionRepository struct {
	DB *gorm.DB
}

func NewMissionRepository(DB *gorm.DB) *MissionRepository {
	return &MissionRepository{DB: DB}
}

func (R *MissionRepository) FindAll() ([]*models.Mission, error) {
	var Result []*models.Mission
	Error := R.DB.Preload("Alchemist").Find(&Result).Error
	return Result, Error
}

func (R *MissionRepository) FindById(ID int) (*models.Mission, error) {
	var Result *models.Mission
	Error := R.DB.Preload("Alchemist").First(&Result, ID).Error
	return Result, Error
}

func (R *MissionRepository) Save(M *models.Mission) (*models.Mission, error) {
	Error := R.DB.Save(M).Error
	return M, Error
}

func (R *MissionRepository) Delete(M *models.Mission) error {
	return R.DB.Delete(M).Error
}
