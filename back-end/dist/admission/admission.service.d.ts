import { DataService } from '../data/data.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
export declare class AdmissionService {
    private dataService;
    constructor(dataService: DataService);
    findAll(): any[];
    findOne(id: number): any;
    create(createAdmissionDto: CreateAdmissionDto): {
        admission_id: number;
        ledger_id: number;
        discharged: boolean;
        patient_name: string;
        uhid: string;
        ward_no: string;
        doctor_assigned: string;
        coverage: number;
        insurance_provider: string;
    };
    update(id: number, update: any): any;
}
