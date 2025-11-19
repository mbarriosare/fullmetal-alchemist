
import type { ResponseTransmutation } from "./TransmutationModel";

export interface CreateAuditory {
	Auditory_Description:		string;
	Auditory_Status:		    string;
};

export interface ResponseAuditory {
	Transmutation:		    	ResponseTransmutation;
	Auditory_ID:			    number;
	Auditory_Description:		string;
	Auditory_Status:		    string;
	Auditory_Created_At:		string;
};
