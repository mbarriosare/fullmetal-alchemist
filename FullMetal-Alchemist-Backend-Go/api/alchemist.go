package api

type AlchemistRequestDTO struct {
	Alchemist_ID         int    `json:"Alchemist_ID"`
	Full_Name            string `json:"Name"`
	Alchemist_Speciality string `json:"Speciality"`
	Alchemist_Rank       string `json:"Rank"`
	Alchemist_Password   string `json:"Password"`
}

type AlchemistResponseDTO struct {
	ID                     int    `json:"Alchemist_ID"`
	Full_Name              string `json:"Alchemist_Name"`
	Alchemist_Speciality   string `json:"Alchemist_Speciality"`
	Alchemist_Rank         string `json:"Alchemist_Rank"`
	Alchemist_Password     string `json:"Alchemist_Password"`
	Alchemist_CreationDate string `json:"Alchemist_Created_At"`
}

type ErrorResponse struct {
	Status      int    `json:"Status"`
	Description string `json:"Description"`
	Message     string `json:"Message"`
}
