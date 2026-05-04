import { Controller, Get, Post, Body, Put, Param, Delete, Logger } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { CreateDoctorDto } from './create-doctor.dto';

@ApiTags('Doctors')
@ApiHeader({ name: 'x-role', description: 'User role (ADMIN or SUPER_USER required for write operations)' })
@Controller('doctor')
export class DoctorController {
  private readonly logger = new Logger('👨‍⚕️ Doctors');

  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS', 'PATIENT')
  findAll() {
    const doctors = this.doctorService.findAll();
    this.logger.log(`📋 LIST ALL  total=${doctors.length} doctors`);
    return doctors;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a doctor by ID' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS', 'PATIENT')
  findOne(@Param('id') id: string) {
    this.logger.log(`🔍 GET  doctor_id=${id}`);
    return this.doctorService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @Roles('ADMIN', 'SUPER_USER')
  create(@Body() doctor: CreateDoctorDto) {
    const result = this.doctorService.create(doctor);
    this.logger.log(`✅ CREATED  id=${result.id}  name="${result.name}"  specialization="${result.specialization}"  status=${result.status}`);
    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a doctor' })
  @Roles('ADMIN', 'SUPER_USER')
  update(@Param('id') id: string, @Body() doctor: CreateDoctorDto) {
    const result = this.doctorService.update(id, doctor);
    this.logger.log(`✏️  UPDATED  doctor_id=${id}  name="${doctor.name}"  status=${doctor.status}`);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a doctor' })
  @Roles('ADMIN', 'SUPER_USER')
  remove(@Param('id') id: string) {
    this.logger.log(`🗑️  DELETED  doctor_id=${id}`);
    return this.doctorService.remove(id);
  }
}
