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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const common_1 = require("@nestjs/common");
const billing_service_1 = require("./billing.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_ledger_entry_dto_1 = require("./dto/create-ledger-entry.dto");
const create_receipt_dto_1 = require("./dto/create-receipt.dto");
const discharge_summary_dto_1 = require("./dto/discharge-summary.dto");
let BillingController = class BillingController {
    billingService;
    logger = new common_1.Logger('💰 Billing');
    constructor(billingService) {
        this.billingService = billingService;
    }
    findLedger(admissionId) {
        const entries = this.billingService.findLedger(+admissionId);
        this.logger.log(`📒 LEDGER GET  admission_id=${admissionId}  entries=${entries.length}`);
        return entries;
    }
    addEntry(admissionId, entry) {
        const result = this.billingService.addLedgerEntry(+admissionId, entry);
        this.logger.log(`➕ LEDGER ADD  admission_id=${admissionId}  service="${entry.service_name}"  qty=${entry.qty}  price=₹${entry.price}  tax=₹${entry.tax}`);
        return result;
    }
    createReceipt(receipt) {
        const result = this.billingService.createReceipt(receipt);
        this.logger.log(`🧾 RECEIPT CREATED  id=${result.id}  patient="${receipt.patient}"  uhid=${receipt.uhid}  amount=₹${receipt.amount}  mode=${receipt.mode}  status=${receipt.status}`);
        return result;
    }
    createSummary(admissionId, summary) {
        const result = this.billingService.createDischargeSummary(+admissionId, summary);
        this.logger.log(`📄 DISCHARGE SUMMARY  admission_id=${admissionId}  followUp="${summary.followUp}"`);
        return result;
    }
    findAllReceipts() {
        const receipts = this.billingService.findAllReceipts();
        this.logger.log(`🧾 RECEIPTS LIST  total=${receipts.length}`);
        return receipts;
    }
};
exports.BillingController = BillingController;
__decorate([
    (0, common_1.Get)('ledger/:admissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ledger entries for an admission' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'FA'),
    __param(0, (0, common_1.Param)('admissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "findLedger", null);
__decorate([
    (0, common_1.Post)('ledger/:admissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a ledger entry' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'FA'),
    __param(0, (0, common_1.Param)('admissionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_ledger_entry_dto_1.CreateLedgerEntryDto]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "addEntry", null);
__decorate([
    (0, common_1.Post)('receipts'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new receipt' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'FA'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_receipt_dto_1.CreateReceiptDto]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createReceipt", null);
__decorate([
    (0, common_1.Post)('discharge-summary/:admissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a discharge summary' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'FA'),
    __param(0, (0, common_1.Param)('admissionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, discharge_summary_dto_1.DischargeSummaryDto]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createSummary", null);
__decorate([
    (0, common_1.Get)('receipts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all receipts' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'FA'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "findAllReceipts", null);
exports.BillingController = BillingController = __decorate([
    (0, swagger_1.ApiTags)('Billing'),
    (0, swagger_1.ApiHeader)({ name: 'x-role', description: 'User role' }),
    (0, common_1.Controller)('billing'),
    __metadata("design:paramtypes", [billing_service_1.BillingService])
], BillingController);
//# sourceMappingURL=billing.controller.js.map