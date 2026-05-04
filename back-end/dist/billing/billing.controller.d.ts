import { BillingService } from './billing.service';
import { CreateLedgerEntryDto } from './dto/create-ledger-entry.dto';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { DischargeSummaryDto } from './dto/discharge-summary.dto';
export declare class BillingController {
    private readonly billingService;
    private readonly logger;
    constructor(billingService: BillingService);
    findLedger(admissionId: string): any[];
    addEntry(admissionId: string, entry: CreateLedgerEntryDto): any;
    createReceipt(receipt: CreateReceiptDto): any;
    createSummary(admissionId: string, summary: DischargeSummaryDto): any;
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
