import { DataService } from '../data/data.service';
import { CreatePatientDto } from './dto/create-patient.dto';
export declare class PatientService {
    private dataService;
    constructor(dataService: DataService);
    findAll(): {
        id: string;
        name: string;
        age: string;
        gender: string;
        phone: string;
        address: string;
    }[];
    findOne(id: string): {
        id: string;
        name: string;
        age: string;
        gender: string;
        phone: string;
        address: string;
    };
    create(createPatientDto: CreatePatientDto): {
        id: string;
        name: string;
        age: string;
        gender: string;
        phone: string;
        address: string;
        email?: string;
    };
    update(id: string, updatePatient: any): {
        id: string;
        name: string;
        age: string;
        gender: string;
        phone: string;
        address: string;
    };
    remove(id: string): {
        id: string;
        name: string;
        age: string;
        gender: string;
        phone: string;
        address: string;
    };
}
