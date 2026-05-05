import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ description: 'The name of the doctor', example: 'Dr. Arjun Mehta' })
  name: string;

  @ApiProperty({ description: 'The specialization of the doctor', example: 'Cardiology' })
  specialization: string;

  @ApiProperty({ description: 'The phone number of the doctor', example: '8881112222' })
  phone: string;

  @ApiProperty({ description: 'The email address of the doctor', example: 'arjun.m@hosp.com' })
  email: string;
}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}

export class CreateDoctorAvailabilityDto {
  @ApiProperty({ description: 'The doctor ID', example: 401 })
  doctor_id: number;

  @ApiProperty({ description: 'The date of availability', example: '2026-03-15' })
  available_date: string;

  @ApiProperty({ description: 'The start time of availability', example: '09:00:00' })
  start_time: string;

  @ApiProperty({ description: 'The end time of availability', example: '12:00:00' })
  end_time: string;

  @ApiProperty({ description: 'The status of availability', example: 'Available' })
  status: string;
}
