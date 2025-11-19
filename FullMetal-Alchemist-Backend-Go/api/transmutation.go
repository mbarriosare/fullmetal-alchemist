package api

type TransmutationRequestDTO struct {
	AlchemicalMaterialID      int    `json:"AlchemicalMaterial_ID"`
	Transmutation_Description string `json:"Description"`
	Transmutation_Status      string `json:"Status"`
	Transmutation_Result      string `json:"Result"`
}

type TransmutationResponseDTO struct {
	AlchemicalMaterial          *AlchemicalMaterialResponseDTO `json:"Alchemical_Material"`
	ID                          int                            `json:"Transmutation_ID"`
	Transmutation_Description   string                         `json:"Transmutation_Description"`
	Transmutation_Status        string                         `json:"Transmutation_Status"`
	Transmutation_Result        string                         `json:"Transmutation_Result"`
	Transmutation_RequestedDate string                         `json:"Transmutacion_Requested"`
}
