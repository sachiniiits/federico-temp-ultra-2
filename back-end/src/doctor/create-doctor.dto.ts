import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Dr. Smith', description: 'Full name of the doctor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Cardiology', description: 'Doctor specialization' })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({ example: '9:00 AM', description: 'Shift start time' })
  @IsString()
  start: string;

  @ApiProperty({ example: '5:00 PM', description: 'Shift end time' })
  @IsString()
  end: string;

  @ApiProperty({
    example: 'Available',
    description: 'Doctor availability status',
    enum: ['Available', 'Not Available'],
    default: 'Available',
  })
  @IsString()
  status: string;
}
