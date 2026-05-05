import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateInventoryItemDto {
  @ApiProperty({ description: 'Name of the item', example: 'Syringe 5ml' })
  item_name: string;

  @ApiProperty({ description: 'Category', example: 'Consumable' })
  category: string;

  @ApiProperty({ description: 'Current stock quantity', example: 500 })
  stock_quantity: number;

  @ApiProperty({ description: 'Reorder level trigger', example: 100 })
  reorder_level: number;

  @ApiProperty({ description: 'Associated Service ID (if applicable)', example: 1, required: false })
  service_id?: number;
}

export class UpdateInventoryItemDto extends PartialType(CreateInventoryItemDto) {}

export class CreatePurchaseRequestDto {
  @ApiProperty({ description: 'Inventory item ID', example: 10 })
  item_id: number;

  @ApiProperty({ description: 'Quantity requested', example: 500 })
  quantity_requested: number;

  @ApiProperty({ description: 'Status of the request', example: 'PENDING' })
  status: string;

  @ApiProperty({ description: 'User ID who requested', example: 101 })
  requested_by: number;
}

export class UpdatePurchaseRequestDto extends PartialType(CreatePurchaseRequestDto) {}
