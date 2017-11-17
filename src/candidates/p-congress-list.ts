import { Candidate } from '../models/candidate';
//import '../globals';
import { ElectOffice } from '../models/elect-office';
import { ElectOfficeGUI } from '../models/elect-office-gui';

export var PRIMCONGOFFICE: ElectOffice =
    {
	electOfficeKey: "2016 Congress Primary",
	office: "Congress",
	election: "Primary",
	mandatory: false,
    }

export var PRIMCONGCANDS: Candidate[] =
    [
        { 
            value: 0, 
            label: "Tim Canova", 
            party: null,
        }, { 
            value: 1, 
            label: "Debbie Wasserman Schultz", 
            party: null,
        }, { 
            value: 25, 
            label: "I don't remember.", 
            party: null,
        }, { 
            value: 26, 
            label: "Other", 
            party: null,
        }, { 
            value: 27, 
            label: "I did not vote for this office.",
            party: null,
        }
    ];

export var PRIMARYCONGRESS: ElectOfficeGUI = 
    {
	inner: PRIMCONGOFFICE,
	candidates: PRIMCONGCANDS,
    }

