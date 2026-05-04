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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../data/data.service");
let PatientService = class PatientService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    findAll() {
        return this.dataService.patientDirectory;
    }
    findOne(id) {
        const patient = this.dataService.patientDirectory.find((p) => p.id === id);
        if (!patient)
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        return patient;
    }
    create(createPatientDto) {
        const newPatient = {
            ...createPatientDto,
            id: createPatientDto.id || `FED-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        };
        this.dataService.patientDirectory.push(newPatient);
        return newPatient;
    }
    update(id, updatePatient) {
        const index = this.dataService.patientDirectory.findIndex((p) => p.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        this.dataService.patientDirectory[index] = { ...this.dataService.patientDirectory[index], ...updatePatient };
        return this.dataService.patientDirectory[index];
    }
    remove(id) {
        const index = this.dataService.patientDirectory.findIndex((p) => p.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Patient with ID ${id} not found`);
        const removed = this.dataService.patientDirectory.splice(index, 1);
        return removed[0];
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], PatientService);
//# sourceMappingURL=patient.service.js.map