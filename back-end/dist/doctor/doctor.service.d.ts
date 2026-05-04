import { DataService } from '../data/data.service';
export declare class DoctorService {
    private dataService;
    constructor(dataService: DataService);
    findAll(): {
        id: string;
        name: string;
        specialization: string;
        start: string;
        end: string;
        status: string;
    }[];
    findOne(id: string): {
        id: string;
        name: string;
        specialization: string;
        start: string;
        end: string;
        status: string;
    };
    create(doctor: any): any;
    update(id: string, updateDoctor: any): {
        id: string;
        name: string;
        specialization: string;
        start: string;
        end: string;
        status: string;
    };
    remove(id: string): {
        id: string;
        name: string;
        specialization: string;
        start: string;
        end: string;
        status: string;
    };
}
