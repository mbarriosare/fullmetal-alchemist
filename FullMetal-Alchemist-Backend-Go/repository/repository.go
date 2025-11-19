package repository

import "gorm.io/gorm"

type Repository struct {
	DB *gorm.DB
}

func NewRepository(DB *gorm.DB) *Repository {
	return &Repository{DB: DB}
}
