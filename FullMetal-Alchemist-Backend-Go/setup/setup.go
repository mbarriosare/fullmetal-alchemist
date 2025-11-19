package setup

type Setup struct {
	Address                 string `json:"address"`
	DataBase                string `json:"database"`
	Duration                int    `json:"duration"`
	DurationWithDescription int    `json:"duration_with_description"`
}
