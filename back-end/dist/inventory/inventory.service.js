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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../data/data.service");
let InventoryService = class InventoryService {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    findAll() {
        return this.dataService.inventoryItems;
    }
    findOne(id) {
        const item = this.dataService.inventoryItems.find((i) => i.item_id === id);
        if (!item)
            throw new common_1.NotFoundException(`Inventory item with ID ${id} not found`);
        return item;
    }
    create(item) {
        this.dataService.inventoryItems.push(item);
        return item;
    }
    update(id, updateItem) {
        const index = this.dataService.inventoryItems.findIndex((i) => i.item_id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Inventory item with ID ${id} not found`);
        this.dataService.inventoryItems[index] = { ...this.dataService.inventoryItems[index], ...updateItem };
        return this.dataService.inventoryItems[index];
    }
    remove(id) {
        const index = this.dataService.inventoryItems.findIndex((i) => i.item_id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Inventory item with ID ${id} not found`);
        const removed = this.dataService.inventoryItems.splice(index, 1);
        return removed[0];
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map