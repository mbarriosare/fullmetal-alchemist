
import type { ResponseAlchemist } from "./AlchemistModel";

export interface CreateAlchemical_Material {
	Alchemist_ID:				number;
	Material_Name:			    string;
	Material_Description:		string;
	Material_Quantity:		    number;
	Material_Rarity:		    string;
};

export interface ResponseAlchemical_Material {
	Alchemist:					ResponseAlchemist;
	Material_ID:				number;
	Material_Name:			    string;
	Material_Description:		string;
	Material_Quantity:		    number;
	Material_Rarity:		    string;
	Material_Collected_At:		string;
};
