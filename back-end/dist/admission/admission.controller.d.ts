import { AdmissionService } from './admission.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
export declare class AdmissionController {
    private readonly admissionService;
    private readonly logger;
    constructor(admissionService: AdmissionService);
    findAll(): any[];
    findOne(id: string): any;
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
    update(id: string, update: any): any;
}
