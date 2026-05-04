import { Controller, Get, Post, Body, Put, Param, Delete, Logger } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ApiTags, ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Patients')
@ApiHeader({ name: 'x-role', description: 'User role (OPERATIONS or SUPER_USER required for write operations)' })
@Controller('patient')
export class PatientController {
  private readonly logger = new Logger('🧑‍🤝‍🧑 Patients');

  constructor(private readonly patientService: PatientService) {}

  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS')
  findAll() {
    const patients = this.patientService.findAll();
    this.logger.log(`📋 LIST ALL  total=${patients.length} patients`);
    return patients;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS', 'PATIENT')
  findOne(@Param('id') id: string) {
    this.logger.log(`🔍 GET  uhid=${id}`);
    return this.patientService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiResponse({ status: 201, description: 'Patient successfully created' })
  @Roles('OPERATIONS', 'SUPER_USER')
  create(@Body() createPatientDto: CreatePatientDto) {
    const result = this.patientService.create(createPatientDto);
    this.logger.log(
      `✅ REGISTERED  uhid=${result.id}  name="${result.name}"  age=${result.age}  gender=${result.gender}  phone=${result.phone}`
    );
    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient information' })
  @Roles('OPERATIONS', 'SUPER_USER')
  update(@Param('id') id: string, @Body() updatePatient: any) {
    const result = this.patientService.update(id, updatePatient);
    const keys = Object.keys(updatePatient).join(', ');
    this.logger.log(`✏️  UPDATED  uhid=${id}  fields=[${keys}]`);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @Roles('SUPER_USER')
  remove(@Param('id') id: string) {
    this.logger.log(`🗑️  DELETED  uhid=${id}`);
    return this.patientService.remove(id);
  }
}
