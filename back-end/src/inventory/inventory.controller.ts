import { Controller, Get, Post, Body, Put, Param, Delete, Logger } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Inventory')
@ApiHeader({ name: 'x-role', description: 'User role (SUPER_USER required for write operations)' })
@Controller('inventory')
export class InventoryController {
  private readonly logger = new Logger('📦 Inventory');

  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all inventory items' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS')
  findAll() {
    const items = this.inventoryService.findAll();
    this.logger.log(`📋 LIST ALL  total=${items.length} items`);
    return items;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an inventory item by ID' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS')
  findOne(@Param('id') id: string) {
    this.logger.log(`🔍 GET  item_id=${id}`);
    return this.inventoryService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new inventory item' })
  @Roles('SUPER_USER')
  create(@Body() item: any) {
    const result = this.inventoryService.create(item);
    this.logger.log(
      `✅ CREATED  item_id=${result.item_id}  name="${result.name}"  category=${result.category}  stock=${result.stock}  unitCost=₹${result.unitCost}`
    );
    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update inventory item' })
  @Roles('SUPER_USER')
  update(@Param('id') id: string, @Body() item: any) {
    const result = this.inventoryService.update(+id, item);
    const keys = Object.keys(item).join(', ');
    this.logger.log(`✏️  UPDATED  item_id=${id}  fields=[${keys}]  stock=${item.stock ?? '?'}`);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete inventory item' })
  @Roles('SUPER_USER')
  remove(@Param('id') id: string) {
    this.logger.log(`🗑️  DELETED  item_id=${id}`);
    return this.inventoryService.remove(+id);
  }
}
