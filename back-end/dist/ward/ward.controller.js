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
exports.WardController = void 0;
const common_1 = require("@nestjs/common");
const ward_service_1 = require("./ward.service");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/roles.decorator");
let WardController = class WardController {
    wardService;
    logger = new common_1.Logger('🏨 Wards');
    constructor(wardService) {
        this.wardService = wardService;
    }
    findAll() {
        const wards = this.wardService.findAll();
        this.logger.log(`📋 LIST ALL  total=${wards.length} wards`);
        return wards;
    }
    findBeds(name) {
        const beds = this.wardService.findBeds(name);
        this.logger.log(`🛏️  GET BEDS  ward="${name}"  total=${beds.length} beds`);
        return beds;
    }
    updateBed(name, bedNumber, body) {
        const result = this.wardService.updateBedStatus(name, bedNumber, body.status, body.patient);
        this.logger.log(`✏️  BED UPDATE  ward="${name}"  bed=${bedNumber}  status="${body.status}"${body.patient ? `  patient="${body.patient}"` : ''}`);
        return result;
    }
};
exports.WardController = WardController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all wards' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'OPERATIONS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name/beds'),
    (0, swagger_1.ApiOperation)({ summary: 'Get beds in a ward' }),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPER_USER', 'OPERATIONS'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WardController.prototype, "findBeds", null);
__decorate([
    (0, common_1.Put)(':name/bed/:bedNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Update bed status' }),
    (0, roles_decorator_1.Roles)('SUPER_USER', 'OPERATIONS'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('bedNumber')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], WardController.prototype, "updateBed", null);
exports.WardController = WardController = __decorate([
    (0, swagger_1.ApiTags)('Wards'),
    (0, swagger_1.ApiHeader)({ name: 'x-role', description: 'User role' }),
    (0, common_1.Controller)('ward'),
    __metadata("design:paramtypes", [ward_service_1.WardService])
], WardController);
//# sourceMappingURL=ward.controller.js.map