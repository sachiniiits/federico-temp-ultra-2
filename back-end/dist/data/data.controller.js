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
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
const swagger_1 = require("@nestjs/swagger");
let DataController = class DataController {
    dataService;
    logger = new common_1.Logger('🔄 DataSync');
    constructor(dataService) {
        this.dataService = dataService;
    }
    getFullState() {
        const admCount = Object.keys(this.dataService.admissions || {}).length;
        const preCount = (this.dataService.preRequests || []).length;
        const dspCount = (this.dataService.dispatchQueue || []).length;
        this.logger.log(`📤 STATE PULLED  | admissions=${admCount}  preRequests=${preCount}  dispatchQueue=${dspCount}`);
        return {
            stateVersion: this.dataService.stateVersion,
            stats: this.dataService.stats,
            doctors: this.dataService.doctors,
            wards: this.dataService.wards,
            inventoryItems: this.dataService.inventoryItems,
            activityLog: this.dataService.activityLog,
            patientDirectory: this.dataService.patientDirectory,
            patientProfiles: this.dataService.patientProfiles,
            preRequests: this.dataService.preRequests,
            pendingAdmissions: this.dataService.pendingAdmissions,
            patients: this.dataService.patients,
            admissions: this.dataService.admissions,
            ledgers: this.dataService.ledgers,
            faLedgerRequests: this.dataService.faLedgerRequests,
            serviceRequests: this.dataService.serviceRequests,
            billingRecords: this.dataService.billingRecords,
            dispatchQueue: this.dataService.dispatchQueue,
            paymentConfirmations: this.dataService.paymentConfirmations,
            receipts: this.dataService.receipts,
            publishedBills: this.dataService.publishedBills,
            bedRequests: this.dataService.bedRequests,
            bedAllocations: this.dataService.bedAllocations,
            emergencyNotifications: this.dataService.emergencyNotifications,
            currentPatientId: this.dataService.currentPatientId,
            appointments: this.dataService.appointments,
        };
    }
    updateFullState(state) {
        const changed = [];
        if (state.stateVersion) {
            this.dataService.stateVersion = state.stateVersion;
            changed.push('stateVersion');
        }
        if (state.stats) {
            this.dataService.stats = state.stats;
            changed.push('stats');
        }
        if (state.doctors) {
            this.dataService.doctors = state.doctors;
            changed.push(`doctors(${state.doctors.length})`);
        }
        if (state.wards) {
            this.dataService.wards = state.wards;
            changed.push(`wards(${state.wards.length})`);
        }
        if (state.inventoryItems) {
            this.dataService.inventoryItems = state.inventoryItems;
            changed.push(`inventory(${state.inventoryItems.length})`);
        }
        if (state.activityLog) {
            this.dataService.activityLog = state.activityLog;
            changed.push(`activityLog(${state.activityLog.length})`);
        }
        if (state.patientDirectory) {
            this.dataService.patientDirectory = state.patientDirectory;
            changed.push(`patientDir(${state.patientDirectory.length})`);
        }
        if (state.patientProfiles) {
            this.dataService.patientProfiles = state.patientProfiles;
            changed.push('profiles');
        }
        if (state.preRequests) {
            this.dataService.preRequests = state.preRequests;
            changed.push(`preRequests(${state.preRequests.length})`);
        }
        if (state.pendingAdmissions) {
            this.dataService.pendingAdmissions = state.pendingAdmissions;
            changed.push(`pendingAdm(${state.pendingAdmissions.length})`);
        }
        if (state.patients) {
            this.dataService.patients = state.patients;
            changed.push(`patients(${state.patients.length})`);
        }
        if (state.admissions) {
            this.dataService.admissions = state.admissions;
            changed.push(`admissions(${Object.keys(state.admissions).length})`);
        }
        if (state.ledgers) {
            this.dataService.ledgers = state.ledgers;
            changed.push(`ledgers(${Object.keys(state.ledgers).length})`);
        }
        if (state.faLedgerRequests) {
            this.dataService.faLedgerRequests = state.faLedgerRequests;
            changed.push(`faLedger(${state.faLedgerRequests.length})`);
        }
        if (state.serviceRequests) {
            this.dataService.serviceRequests = state.serviceRequests;
            changed.push(`svcReq(${state.serviceRequests.length})`);
        }
        if (state.billingRecords) {
            this.dataService.billingRecords = state.billingRecords;
            changed.push(`billingRec(${state.billingRecords.length})`);
        }
        if (state.dispatchQueue) {
            this.dataService.dispatchQueue = state.dispatchQueue;
            changed.push(`dispatch(${state.dispatchQueue.length})`);
        }
        if (state.paymentConfirmations) {
            this.dataService.paymentConfirmations = state.paymentConfirmations;
            changed.push(`payments(${state.paymentConfirmations.length})`);
        }
        if (state.receipts) {
            this.dataService.receipts = state.receipts;
            changed.push(`receipts(${state.receipts.length})`);
        }
        if (state.publishedBills) {
            this.dataService.publishedBills = state.publishedBills;
            changed.push(`bills(${state.publishedBills.length})`);
        }
        if (state.bedRequests) {
            this.dataService.bedRequests = state.bedRequests;
            changed.push(`bedReq(${state.bedRequests.length})`);
        }
        if (state.bedAllocations) {
            this.dataService.bedAllocations = state.bedAllocations;
            changed.push(`bedAlloc(${state.bedAllocations.length})`);
        }
        if (state.emergencyNotifications) {
            this.dataService.emergencyNotifications = state.emergencyNotifications;
            changed.push(`emergency(${state.emergencyNotifications.length})`);
        }
        if (state.currentPatientId) {
            this.dataService.currentPatientId = state.currentPatientId;
            changed.push(`currentPt=${state.currentPatientId}`);
        }
        if (state.appointments) {
            this.dataService.appointments = state.appointments;
            changed.push(`appts(${state.appointments.length})`);
        }
        this.logger.log(`📥 STATE PUSHED  | updated: ${changed.join(', ') || 'nothing'}`);
        return { success: true };
    }
};
exports.DataController = DataController;
__decorate([
    (0, common_1.Get)('full-state'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the full in-memory state' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataController.prototype, "getFullState", null);
__decorate([
    (0, common_1.Post)('full-state'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the full in-memory state' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "updateFullState", null);
exports.DataController = DataController = __decorate([
    (0, swagger_1.ApiTags)('Data Sync'),
    (0, common_1.Controller)('data'),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DataController);
//# sourceMappingURL=data.controller.js.map