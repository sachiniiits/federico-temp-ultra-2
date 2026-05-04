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
exports.AdmissionService = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../data/data.service");
let AdmissionService = class AdmissionService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    findAll() {
        return Object.values(this.dataService.admissions);
    }
    findOne(id) {
        const admission = this.dataService.admissions[id];
        if (!admission)
            throw new common_1.NotFoundException(`Admission ${id} not found`);
        return admission;
    }
    create(createAdmissionDto) {
        const id = createAdmissionDto.admission_id || 700 + Object.keys(this.dataService.admissions).length + 1;
        const ledger_id = createAdmissionDto.ledger_id || 800 + Object.keys(this.dataService.ledgers).length + 1;
        const newAdmission = {
            ...createAdmissionDto,
            admission_id: id,
            ledger_id: ledger_id,
            discharged: createAdmissionDto.discharged || false,
        };
        this.dataService.admissions[id] = newAdmission;
        if (!this.dataService.ledgers[ledger_id]) {
            this.dataService.ledgers[ledger_id] = [];
        }
        return newAdmission;
    }
    update(id, update) {
        if (!this.dataService.admissions[id])
            throw new common_1.NotFoundException(`Admission ${id} not found`);
        this.dataService.admissions[id] = { ...this.dataService.admissions[id], ...update };
        return this.dataService.admissions[id];
    }
};
exports.AdmissionService = AdmissionService;
exports.AdmissionService = AdmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], AdmissionService);
//# sourceMappingURL=admission.service.js.map