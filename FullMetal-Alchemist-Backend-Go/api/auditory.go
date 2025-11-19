package api

type AuditoryRequestDTO struct {
	TransmutationID      int    `json:"TransmutationID"`
	Auditory_Description string `json:"Description"`
	Auditory_Status      string `json:"Status"`
}

type AuditoryResponseDTO struct {
	Transmutation         *TransmutationResponseDTO `json:"Transmutation"`
	ID                    int                       `json:"Auditory_ID"`
	Auditory_Description  string                    `json:"Auditory_Description"`
	Auditory_Status       string                    `json:"Auditory_Status"`
	Auditory_CreationDate string                    `json:"Auditory_Created_At"`
}
