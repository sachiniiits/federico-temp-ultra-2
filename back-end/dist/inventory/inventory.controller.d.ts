import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    private readonly logger;
    constructor(inventoryService: InventoryService);
    findAll(): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    }[];
    findOne(id: string): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    };
    create(item: any): any;
    update(id: string, item: any): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    };
    remove(id: string): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    };
}
