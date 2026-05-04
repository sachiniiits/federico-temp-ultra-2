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
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../data/data.service");
let RequestService = class RequestService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    findAllPreRequests() {
        return this.dataService.preRequests;
    }
    createPreRequest(request) {
        const newRequest = {
            ...request,
            id: request.id || `PRE-REQ-${Date.now()}`,
            appointmentId: request.appointmentId || `PRE-APT-${Date.now()}`,
        };
        this.dataService.preRequests.push(newRequest);
        return newRequest;
    }
    updatePreRequest(id, update) {
        const index = this.dataService.preRequests.findIndex((r) => r.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Request ${id} not found`);
        this.dataService.preRequests[index] = { ...this.dataService.preRequests[index], ...update };
        return this.dataService.preRequests[index];
    }
};
exports.RequestService = RequestService;
exports.RequestService = RequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], RequestService);
//# sourceMappingURL=request.service.js.map