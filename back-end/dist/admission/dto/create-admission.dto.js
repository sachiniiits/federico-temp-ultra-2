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
exports.CreateAdmissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAdmissionDto {
    admission_id;
    ledger_id;
    patient_name;
    uhid;
    ward_no;
    doctor_assigned;
    coverage;
    insurance_provider;
    discharged;
}
exports.CreateAdmissionDto = CreateAdmissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 701, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAdmissionDto.prototype, "admission_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 801, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAdmissionDto.prototype, "ledger_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rahul Verma' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdmissionDto.prototype, "patient_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FED-2026-TEST01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdmissionDto.prototype, "uhid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ICU-05' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdmissionDto.prototype, "ward_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. Qasim' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdmissionDto.prototype, "doctor_assigned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAdmissionDto.prototype, "coverage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Star Health' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdmissionDto.prototype, "insurance_provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, default: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAdmissionDto.prototype, "discharged", void 0);
//# sourceMappingURL=create-admission.dto.js.map