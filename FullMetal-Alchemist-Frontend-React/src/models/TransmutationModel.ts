
import type { ResponseAlchemical_Material } from "./AlchemicalMaterialModel";

export interface CreateTransmutation {
	Transmutation_Description:	    string;
	Transmutation_Status:		    string;
	Transmutation_Result:		    string;
};

export interface ResponseTransmutation {
	Alchemical_Material:	    		ResponseAlchemical_Material;
	Transmutation_ID:		        	number;
	Transmutation_Description:	    	string;
	Transmutation_Status:		    	string;
	Transmutation_Result:		    	string;
	Transmutation_Requested:			string;
};
