package api

type AlchemicalMaterialRequestDTO struct {
	Alchemist_ID         int    `json:"Alchemist_ID"`
	Material_Name        string `json:"Material_Name"`
	Material_Description string `json:"Material_Description"`
	Material_Quantity    int    `json:"Material_Quantity"`
	Material_Rarity      string `json:"Material_Rarity"`
}

type AlchemicalMaterialResponseDTO struct {
	Alchemist               *AlchemistResponseDTO `json:"Alchemist"`
	ID                      int                   `json:"Material_ID"`
	Material_Name           string                `json:"Material_Name"`
	Material_Description    string                `json:"Material_Description"`
	Material_Quantity       int                   `json:"Material_Quantity"`
	Material_Rarity         string                `json:"Material_Rarity"`
	Material_CollectionDate string                `json:"Material_Collected_At"`
}
