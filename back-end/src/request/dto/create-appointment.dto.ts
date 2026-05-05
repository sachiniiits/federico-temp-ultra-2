import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'The patient ID', example: 201 })
  patient_id: number;

  @ApiProperty({ description: 'The doctor availability ID', example: 501 })
  availability_id: number;

  @ApiProperty({ description: 'Scheduled date and time', example: '2026-03-15T09:30:00Z' })
  scheduled_datetime: string;

  @ApiProperty({ description: 'Type of visit: OPD, EMERGENCY, or FOLLOWUP', example: 'OPD' })
  visit_type: string;

  @ApiProperty({ description: 'Status: PENDING, CONFIRMED, CANCELLED, COMPLETED', example: 'PENDING' })
  status: string;

  @ApiProperty({ description: 'The user ID who created the appointment', example: 101 })
  created_by: number;
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
