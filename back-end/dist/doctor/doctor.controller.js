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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_doctor_dto_1 = require("./create-doctor.dto");
let DoctorController = class DoctorController {
    doctorService;
    logger = new common_1.Logger('👨‍⚕️ Doctors');
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    findAll() {
        const doctors = this.doctorService.findAll();
        this.logger.log(`📋 LIST ALL  total=${doctors.length} doctors`);
        return doctors;
    }
    findOne(id) {
        this.logger.log(`🔍 GET  doctor_id=${id}`);
        return this.doctorService.findOne(id);
    }
    create(doctor) {
        const result = this.doctorService.create(doctor);
        this.logger.log(`✅ CREATED  id=${result.id}  name="${result.name}"  specialization="${result.specialization}"  status=${result.status}`);
        return result;
    }
    update(id, doctor) {
        const result = this.doctorService.update(id, doctor);
        this.logger.log(`✏️  UPDATED  doctor_id=${id}  name="${doctor.name}"  status=${doctor.status}`);
        return result;
    }
    remove(id) {
        this.logger.log(`🗑️  DELETED  doctor_id=${id}`);
        return this.doctorService.remove(id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all doctors' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'OPERATIONS', 'PATIENT'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a doctor by ID' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'OPERATIONS', 'PATIENT'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new doctor' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a doctor' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a doctor' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorController.prototype, "remove", null);
exports.DoctorController = DoctorController = __decorate([
    (0, swagger_1.ApiTags)('Doctors'),
    (0, swagger_1.ApiHeader)({ name: 'x-role', description: 'User role (ADMIN or SUPER_USER required for write operations)' }),
    (0, common_1.Controller)('doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map