"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../data/data.service");
let BillingService = class BillingService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    findLedger(admissionId) {
        const ledger = this.dataService.ledgers[admissionId];
        if (!ledger)
            throw new common_1.NotFoundException(`Ledger for admission ${admissionId} not found`);
        return ledger;
    }
    addLedgerEntry(admissionId, entry) {
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
    createReceipt(receipt) {
        const newReceipt = {
            ...receipt,
            id: receipt.id || 900 + this.dataService.receipts.length + 1,
            ts: receipt.ts || Date.now(),
        };
        this.dataService.receipts.push(newReceipt);
        return newReceipt;
    }
    createDischargeSummary(admissionId, summary) {
        if (!this.dataService.admissions[admissionId])
            throw new common_1.NotFoundException(`Admission ${admissionId} not found`);
        this.dataService.admissions[admissionId].dischargeSummary = {
            ...summary,
            ts: Date.now(),
        };
        return this.dataService.admissions[admissionId].dischargeSummary;
    }
    findAllReceipts() {
        return this.dataService.receipts;
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], BillingService);
//# sourceMappingURL=billing.service.js.map