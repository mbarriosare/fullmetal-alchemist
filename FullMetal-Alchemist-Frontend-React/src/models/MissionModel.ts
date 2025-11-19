
import type { ResponseAlchemist } from "./AlchemistModel";

export interface CreateMission {
	Alchemist_ID:			number;
	Mission_Title:		    string;
	Mission_Status:		    string;
	Mission_Description:	string;
};

export interface ResponseMission {
	Alchemist:				ResponseAlchemist;
	Mission_ID:		        number;
	Mission_Title:		    string;
	Mission_Status:		    string;
	Mission_Description:	string;
	Mission_Created_At:		string;
};
