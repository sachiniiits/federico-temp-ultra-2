import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
export declare class PatientController {
    private readonly patientService;
    private readonly logger;
    constructor(patientService: PatientService);
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
