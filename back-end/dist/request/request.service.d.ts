import { DataService } from '../data/data.service';
export declare class RequestService {
    private dataService;
    constructor(dataService: DataService);
    findAllPreRequests(): {
        id: string;
        appointmentId: string;
        patientId: string;
        name: string;
        age: string;
        gender: string;
        department: string;
        status: string;
        homStatus: string;
    }[];
    createPreRequest(request: any): any;
    updatePreRequest(id: string, update: any): {
        id: string;
        appointmentId: string;
        patientId: string;
        name: string;
        age: string;
        gender: string;
        department: string;
        status: string;
        homStatus: string;
    };
}
