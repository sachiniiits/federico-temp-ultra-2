import { Controller, Get, Post, Body, Put, Param, Logger } from '@nestjs/common';
import { WardService } from './ward.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Wards')
@ApiHeader({ name: 'x-role', description: 'User role' })
@Controller('ward')
export class WardController {
  private readonly logger = new Logger('🏨 Wards');

  constructor(private readonly wardService: WardService) {}

  @Get()
  @ApiOperation({ summary: 'Get all wards' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS')
  findAll() {
    const wards = this.wardService.findAll();
    this.logger.log(`📋 LIST ALL  total=${wards.length} wards`);
    return wards;
  }

  @Get(':name/beds')
  @ApiOperation({ summary: 'Get beds in a ward' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS')
  findBeds(@Param('name') name: string) {
    const beds = this.wardService.findBeds(name);
    this.logger.log(`🛏️  GET BEDS  ward="${name}"  total=${beds.length} beds`);
    return beds;
  }

  @Put(':name/bed/:bedNumber')
  @ApiOperation({ summary: 'Update bed status' })
  @Roles('SUPER_USER', 'OPERATIONS')
  updateBed(
    @Param('name') name: string,
    @Param('bedNumber') bedNumber: string,
    @Body() body: { status: string; patient?: string },
  ) {
    const result = this.wardService.updateBedStatus(name, bedNumber, body.status, body.patient);
    this.logger.log(
      `✏️  BED UPDATE  ward="${name}"  bed=${bedNumber}  status="${body.status}"${body.patient ? `  patient="${body.patient}"` : ''}`
    );
    return result;
  }
}
