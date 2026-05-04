import { DataService } from '../data/data.service';
export declare class BillingService {
    private dataService;
    constructor(dataService: DataService);
    findLedger(admissionId: number): any[];
    addLedgerEntry(admissionId: number, entry: any): any;
    createReceipt(receipt: any): any;
    createDischargeSummary(admissionId: number, summary: any): any;
    findAllReceipts(): {
        id: number;
        patient: string;
        uhid: string;
        amount: number;
        gross: number;
        coverage: number;
        insurance: string;
        mode: string;
        status: string;
        ts: number;
    }[];
}
