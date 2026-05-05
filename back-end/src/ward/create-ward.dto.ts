import { ApiProperty } from '@nestjs/swagger';

export class CreateWardDto {
  @ApiProperty({ description: 'Name of the ward', example: 'General Ward A' })
  ward_name: string;

  @ApiProperty({ description: 'Total beds in the ward', example: 20 })
  total_beds: number;

  @ApiProperty({ description: 'Description of the ward', example: 'North Wing Floor 1', required: false })
  description?: string;
}

export class CreateBedDto {
  @ApiProperty({ description: 'Ward ID this bed belongs to', example: 1 })
  ward_id: number;

  @ApiProperty({ description: 'The bed number identifier', example: 'G-101' })
  bed_number: string;

  @ApiProperty({ description: 'Current status of the bed', example: 'AVAILABLE' })
  status: string;
}

export class UpdateBedStatusDto {
  @ApiProperty({ description: 'The new status of the bed', example: 'OCCUPIED' })
  status: string;
}
