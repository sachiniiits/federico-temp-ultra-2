import { Controller, Get, Post, Body, Put, Param, Logger } from '@nestjs/common';
import { RequestService } from './request.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { CreatePreRequestDto } from './dto/create-pre-request.dto';

@ApiTags('Requests')
@ApiHeader({ name: 'x-role', description: 'User role' })
@Controller('request')
export class RequestController {
  private readonly logger = new Logger('📋 PRE Requests');

  constructor(private readonly requestService: RequestService) {}

  @Get('pre')
  @ApiOperation({ summary: 'Get all PRE requests' })
  @Roles('ADMIN', 'SUPER_USER', 'OPERATIONS')
  findAll() {
    const requests = this.requestService.findAllPreRequests();
    this.logger.log(`📋 LIST ALL  total=${requests.length} PRE requests`);
    return requests;
  }

  @Post('pre')
  @ApiOperation({ summary: 'Create a new PRE request' })
  @Roles('OPERATIONS', 'SUPER_USER')
  create(@Body() request: CreatePreRequestDto) {
    const result = this.requestService.createPreRequest(request);
    this.logger.log(
      `✅ CREATED  id=${result.id}  patient="${request.name}"  uhid=${request.patientId}  dept=${request.department}  type=${result.visitType || 'Consultation'}  status=${result.status}`
    );
    return result;
  }

  @Put('pre/:id')
  @ApiOperation({ summary: 'Update a PRE request' })
  @Roles('SUPER_USER', 'OPERATIONS')
  update(@Param('id') id: string, @Body() update: any) {
    const result = this.requestService.updatePreRequest(id, update);
    const keys = Object.keys(update).join(', ');
    this.logger.log(`✏️  UPDATED  request_id=${id}  status=${update.status || '?'}  homStatus=${update.homStatus || '?'}  fields=[${keys}]`);
    return result;
  }
}
