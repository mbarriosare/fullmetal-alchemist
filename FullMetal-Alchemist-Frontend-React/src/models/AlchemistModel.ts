
export interface CreateAlchemist {
    Alchemist_ID:           string;
    Alchemist_Name:		    string;
    Alchemist_Speciality:	string;
	Alchemist_Rank:		    string;
	Alchemist_Password:	    string;
};

export interface ResponseAlchemist {
    Alchemist_ID:		    number;
    Alchemist_Name:		    string;
    Alchemist_Speciality:	string;
	Alchemist_Rank:		    string;
	Alchemist_Password:	    string;
	Alchemist_Created_At:	string;
};
