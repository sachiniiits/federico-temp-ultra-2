import { WardService } from './ward.service';
export declare class WardController {
    private readonly wardService;
    private readonly logger;
    constructor(wardService: WardService);
    findAll(): {
        name: string;
        total: number;
        occupied: number;
        available: number;
        maintenance: number;
        beds: ({
            number: string;
            status: string;
            patient: string;
        } | {
            number: string;
            status: string;
            patient?: undefined;
        })[];
    }[];
    findBeds(name: string): ({
        number: string;
        status: string;
        patient: string;
    } | {
        number: string;
        status: string;
        patient?: undefined;
    })[];
    updateBed(name: string, bedNumber: string, body: {
        status: string;
        patient?: string;
    }): {
        number: string;
        status: string;
        patient: string;
    } | {
        number: string;
        status: string;
        patient?: undefined;
    };
}
