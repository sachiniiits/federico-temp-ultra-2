import { Controller, Get, Post, Body, Put, Param, Logger } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { CreateAdmissionDto } from './dto/create-admission.dto';

@ApiTags('Admissions')
@ApiHeader({ name: 'x-role', description: 'User role' })
@Controller('admission')
export class AdmissionController {
  private readonly logger = new Logger('🏥 Admissions');

  constructor(private readonly admissionService: AdmissionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all admissions' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS', 'FA')
  findAll() {
    const admissions = this.admissionService.findAll();
    this.logger.log(`📋 LIST ALL  | total=${Object.keys(admissions).length} admissions`);
    return admissions;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admission by ID' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS', 'FA')
  findOne(@Param('id') id: string) {
    this.logger.log(`🔍 GET  admission_id=${id}`);
    return this.admissionService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new admission (HOM)' })
  @Roles('OPERATIONS', 'SUPER_USER')
  create(@Body() createAdmissionDto: CreateAdmissionDto) {
    const result = this.admissionService.create(createAdmissionDto);
    this.logger.log(
      `✅ CREATED  admission_id=${result.admission_id}  patient="${result.patient_name}"  ward=${result.ward_no}  uhid=${result.uhid}`
    );
    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admission details' })
  @Roles('OPERATIONS', 'SUPER_USER', 'FA')
  update(@Param('id') id: string, @Body() update: any) {
    const result = this.admissionService.update(+id, update);
    const keys = Object.keys(update).join(', ');
    this.logger.log(`✏️  UPDATED  admission_id=${id}  fields=[${keys}]`);
    return result;
  }
}
