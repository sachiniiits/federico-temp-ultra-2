import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class BillingService {
  constructor(private dataService: DataService) {}

  findLedger(admissionId: number) {
    const ledger = this.dataService.ledgers[admissionId];
    if (!ledger) throw new NotFoundException(`Ledger for admission ${admissionId} not found`);
    return ledger;
  }

  addLedgerEntry(admissionId: number, entry: any) {
    if (!this.dataService.ledgers[admissionId]) {
      this.dataService.ledgers[admissionId] = [];
    }
    const newEntry = {
      ...entry,
      entry_id: entry.entry_id || Date.now(),
      ts: entry.ts || Date.now(),
    };
    this.dataService.ledgers[admissionId].push(newEntry);
    return newEntry;
  }

  createReceipt(receipt: any) {
    const newReceipt = {
      ...receipt,
      id: receipt.id || 900 + this.dataService.receipts.length + 1,
      ts: receipt.ts || Date.now(),
    };
    this.dataService.receipts.push(newReceipt);
    return newReceipt;
  }

  createDischargeSummary(admissionId: number, summary: any) {
    if (!this.dataService.admissions[admissionId]) throw new NotFoundException(`Admission ${admissionId} not found`);
    this.dataService.admissions[admissionId].dischargeSummary = {
      ...summary,
      ts: Date.now(),
    };
    return this.dataService.admissions[admissionId].dischargeSummary;
  }

  findAllReceipts() {
    return this.dataService.receipts;
  }
}
