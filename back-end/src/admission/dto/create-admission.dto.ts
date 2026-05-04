import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateAdmissionDto {
  @ApiProperty({ example: 701, required: false })
  @IsNumber()
  @IsOptional()
  admission_id?: number;

  @ApiProperty({ example: 801, required: false })
  @IsNumber()
  @IsOptional()
  ledger_id?: number;

  @ApiProperty({ example: 'Rahul Verma' })
  @IsString()
  @IsNotEmpty()
  patient_name: string;

  @ApiProperty({ example: 'FED-2026-TEST01' })
  @IsString()
  @IsNotEmpty()
  uhid: string;

  @ApiProperty({ example: 'ICU-05' })
  @IsString()
  ward_no: string;

  @ApiProperty({ example: 'Dr. Qasim' })
  @IsString()
  doctor_assigned: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  coverage: number;

  @ApiProperty({ example: 'Star Health' })
  @IsString()
  insurance_provider: string;

  @ApiProperty({ example: false, default: false })
  @IsBoolean()
  @IsOptional()
  discharged?: boolean;
}
