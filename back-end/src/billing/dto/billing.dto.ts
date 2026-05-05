import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Consultation Fee' })
  service_name: string;

  @ApiProperty({ example: 500.00 })
  base_cost: number;
}

export class CreateLedgerDto {
  @ApiProperty({ example: 701 })
  admission_id: number;

  @ApiProperty({ example: 'OPEN' })
  status: string;
}

export class CreateLedgerEntryDto {
  @ApiProperty({ example: 801 })
  ledger_id: number;

  @ApiProperty({ example: 1 })
  service_id: number;

  @ApiProperty({ example: 1 })
  quantity: number;

  @ApiProperty({ example: 500.00 })
  unit_price: number;

  @ApiProperty({ example: 500.00 })
  amount: number;
}

export class CreatePaymentDto {
  @ApiProperty({ example: 801 })
  ledger_id: number;

  @ApiProperty({ example: 3100.00 })
  amount_paid: number;

  @ApiProperty({ example: 'UPI' })
  payment_mode: string;
}

export class CreateDischargeSummaryDto {
  @ApiProperty({ example: 701 })
  admission_id: number;

  @ApiProperty({ example: 201 })
  patient_id: number;

  @ApiProperty({ example: 'Recovered well. Followup in 7 days.' })
  discharge_notes: string;

  @ApiProperty({ example: 15500.00 })
  final_amount: number;

  @ApiProperty({ example: '/path/ds_201.pdf', required: false })
  file_path?: string;
}
