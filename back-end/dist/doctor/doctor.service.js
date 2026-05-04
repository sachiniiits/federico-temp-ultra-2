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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../data/data.service");
let DoctorService = class DoctorService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    findAll() {
        return this.dataService.doctors;
    }
    findOne(id) {
        const doctor = this.dataService.doctors.find((d) => d.id === id);
        if (!doctor)
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        return doctor;
    }
    create(doctor) {
        const newDoctor = {
            id: `D${Date.now()}`,
            status: 'Available',
            ...doctor,
        };
        this.dataService.doctors.push(newDoctor);
        return newDoctor;
    }
    update(id, updateDoctor) {
        const index = this.dataService.doctors.findIndex((d) => d.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        this.dataService.doctors[index] = { ...this.dataService.doctors[index], ...updateDoctor };
        return this.dataService.doctors[index];
    }
    remove(id) {
        const index = this.dataService.doctors.findIndex((d) => d.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        const removed = this.dataService.doctors.splice(index, 1);
        return removed[0];
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map