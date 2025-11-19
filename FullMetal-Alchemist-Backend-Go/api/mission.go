package api

type MissionRequestDTO struct {
	Alchemist_ID        int    `json:"Alchemist_ID"`
	Mission_Title       string `json:"Title"`
	Mission_Status      string `json:"Status"`
	Mission_Description string `json:"Description"`
}

type MissionResponseDTO struct {
	Alchemist            *AlchemistResponseDTO `json:"Alchemist"`
	ID                   int                   `json:"Mission_ID"`
	Mission_Title        string                `json:"Mission_Title"`
	Mission_Status       string                `json:"Mission_Status"`
	Mission_Description  string                `json:"Mission_Description"`
	Mission_CreationDate string                `json:"Mission_Created_At"`
}
