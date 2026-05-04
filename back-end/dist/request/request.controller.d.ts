import { RequestService } from './request.service';
import { CreatePreRequestDto } from './dto/create-pre-request.dto';
export declare class RequestController {
    private readonly requestService;
    private readonly logger;
    constructor(requestService: RequestService);
    findAll(): {
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
    create(request: CreatePreRequestDto): any;
    update(id: string, update: any): {
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
