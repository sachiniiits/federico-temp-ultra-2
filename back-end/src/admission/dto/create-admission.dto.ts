import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAdmissionDto {
  @ApiProperty({ description: 'The appointment ID', example: 601 })
  appointment_id: number;

  @ApiProperty({ description: 'The patient ID', example: 201 })
  patient_id: number;

  @ApiProperty({ description: 'The bed ID', example: 11 })
  bed_id: number;

  @ApiProperty({ description: 'Admission time', example: '2026-03-15T10:30:00Z', required: false })
  admit_time?: string;

  @ApiProperty({ description: 'Discharge time', example: '2026-03-18T10:00:00Z', required: false })
  discharge_time?: string;

  @ApiProperty({ description: 'Status of admission', example: 'ADMITTED' })
  status: string;
}

export class UpdateAdmissionDto extends PartialType(CreateAdmissionDto) {}
