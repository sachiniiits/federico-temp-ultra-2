import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class InventoryService {
  constructor(private dataService: DataService) {}

  findAll() {
    return this.dataService.inventoryItems;
  }

  findOne(id: number) {
    const item = this.dataService.inventoryItems.find((i) => i.item_id === id);
    if (!item) throw new NotFoundException(`Inventory item with ID ${id} not found`);
    return item;
  }

  create(item: any) {
    this.dataService.inventoryItems.push(item);
    return item;
  }

  update(id: number, updateItem: any) {
    const index = this.dataService.inventoryItems.findIndex((i) => i.item_id === id);
    if (index === -1) throw new NotFoundException(`Inventory item with ID ${id} not found`);
    this.dataService.inventoryItems[index] = { ...this.dataService.inventoryItems[index], ...updateItem };
    return this.dataService.inventoryItems[index];
  }

  remove(id: number) {
    const index = this.dataService.inventoryItems.findIndex((i) => i.item_id === id);
    if (index === -1) throw new NotFoundException(`Inventory item with ID ${id} not found`);
    const removed = this.dataService.inventoryItems.splice(index, 1);
    return removed[0];
  }
}
