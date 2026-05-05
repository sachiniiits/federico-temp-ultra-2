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
exports.CreatePatientInsuranceDto = exports.UpdatePatientDto = exports.CreatePatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatePatientDto {
    user_id;
    uhid;
    name;
    phone;
    alternate_phone;
    dob;
    gender;
    blood_group;
    address;
    emergency_contact_name;
    emergency_contact_phone;
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The user ID associated with this patient', example: 101 }),
    __metadata("design:type", Number)
], CreatePatientDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique Hospital Identification Number', example: 'UHID-882100' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "uhid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the patient', example: 'Hamiz Shams' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The phone number of the patient', example: '+91-9876543210' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The alternate phone number', example: '+91-9876543211', required: false }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "alternate_phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of birth', example: '1998-04-12' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gender of the patient', example: 'Male' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Blood group', example: 'O+', required: false }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "blood_group", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address', example: '12 MG Road, Hyderabad', required: false }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Emergency contact name', example: 'Amina Begum', required: false }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "emergency_contact_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Emergency contact phone', example: '+91-9000011111', required: false }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "emergency_contact_phone", void 0);
class UpdatePatientDto extends (0, swagger_1.PartialType)(CreatePatientDto) {
}
exports.UpdatePatientDto = UpdatePatientDto;
class CreatePatientInsuranceDto {
    patient_id;
    provider_name;
    policy_number;
    member_id;
    coverage_type;
    valid_from;
    valid_to;
}
exports.CreatePatientInsuranceDto = CreatePatientInsuranceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The patient ID', example: 201 }),
    __metadata("design:type", Number)
], CreatePatientInsuranceDto.prototype, "patient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The insurance provider name', example: 'Niva Bupa' }),
    __metadata("design:type", String)
], CreatePatientInsuranceDto.prototype, "provider_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The policy number', example: 'NB-77210' }),
    __metadata("design:type", String)
], CreatePatientInsuranceDto.prototype, "policy_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The member ID', example: 'M-990' }),
    __metadata("design:type", String)
], CreatePatientInsuranceDto.prototype, "member_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coverage type', example: 'Full' }),
    __metadata("design:type", String)
], CreatePatientInsuranceDto.prototype, "coverage_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valid from date', example: '2025-01-01' }),
    __metadata("design:type", String)
], CreatePatientInsuranceDto.prototype, "valid_from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valid to date', example: '2027-12-31' }),
    __metadata("design:type", String)
], CreatePatientInsuranceDto.prototype, "valid_to", void 0);
//# sourceMappingURL=create-patient.dto.js.map