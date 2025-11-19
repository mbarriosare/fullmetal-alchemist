package repository

import (
	"FullMetal-Alchemist-Backend-Go/models"
	"errors"

	"gorm.io/gorm"
)

type SupervisorRepository struct {
	db *gorm.DB
}

func NewSupervisors(db *gorm.DB) *SupervisorRepository {
	return &SupervisorRepository{
		db: db,
	}
}

func (S *SupervisorRepository) FindById(ID int) (*models.Supervisor, error) {
	var Supervisor models.Supervisor
	Error := S.db.Where("Supervisor_ID = ?", ID).First(&Supervisor).Error
	if Error != nil && !errors.Is(Error, gorm.ErrRecordNotFound) {
		return nil, Error
	}
	if Error == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &Supervisor, nil
}

func (S *SupervisorRepository) FindAll() ([]*models.Supervisor, error) {
	var Supervisors []*models.Supervisor
	Error := S.db.Find(&Supervisors).Error
	if Error != nil {
		return nil, Error
	}
	return Supervisors, nil
}

func (S *SupervisorRepository) Save(Info *models.Supervisor) (*models.Supervisor, error) {
	Error := S.db.Save(Info).Error
	if Error != nil {
		return nil, Error
	}
	return Info, nil
}

func (S *SupervisorRepository) Delete(Info *models.Supervisor) error {
	Error := S.db.Delete(Info).Error
	if Error != nil {
		return Error
	}
	return nil
}
