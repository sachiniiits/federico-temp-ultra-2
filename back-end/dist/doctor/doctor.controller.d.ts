import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './create-doctor.dto';
export declare class DoctorController {
    private readonly doctorService;
    private readonly logger;
    constructor(doctorService: DoctorService);
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
    create(doctor: CreateDoctorDto): any;
    update(id: string, doctor: CreateDoctorDto): {
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
