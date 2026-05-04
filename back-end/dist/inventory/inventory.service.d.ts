import { DataService } from '../data/data.service';
export declare class InventoryService {
    private dataService;
    constructor(dataService: DataService);
    findAll(): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    }[];
    findOne(id: number): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    };
    create(item: any): any;
    update(id: number, updateItem: any): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    };
    remove(id: number): {
        item_id: number;
        name: string;
        category: string;
        stock: number;
        reorderLevel: number;
        unit: string;
        unitCost: number;
    };
}
