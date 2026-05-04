import { DataService } from '../data/data.service';
export declare class WardService {
    private dataService;
    constructor(dataService: DataService);
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
    findBeds(wardName: string): ({
        number: string;
        status: string;
        patient: string;
    } | {
        number: string;
        status: string;
        patient?: undefined;
    })[];
    updateBedStatus(wardName: string, bedNumber: string, status: string, patient?: string): {
        number: string;
        status: string;
        patient: string;
    } | {
        number: string;
        status: string;
        patient?: undefined;
    };
}
