import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: 'FED-2026-9001', required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'Arun Mehta' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '54' })
  @IsString()
  age: string;

  @ApiProperty({ example: 'Male' })
  @IsString()
  gender: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Banjara Hills' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'arun.mehta@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;
}
