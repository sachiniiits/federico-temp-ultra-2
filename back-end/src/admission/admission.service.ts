import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';

@Injectable()
export class AdmissionService {
  constructor(private dataService: DataService) {}

  findAll() {
    return Object.values(this.dataService.admissions);
  }

  findOne(id: number) {
    const admission = this.dataService.admissions[id];
    if (!admission) throw new NotFoundException(`Admission ${id} not found`);
    return admission;
  }

  create(createAdmissionDto: CreateAdmissionDto) {
    const id = createAdmissionDto.admission_id || 700 + Object.keys(this.dataService.admissions).length + 1;
    const ledger_id = createAdmissionDto.ledger_id || 800 + Object.keys(this.dataService.ledgers).length + 1;
    
    const newAdmission = {
      ...createAdmissionDto,
      admission_id: id,
      ledger_id: ledger_id,
      discharged: createAdmissionDto.discharged || false,
    };
    
    this.dataService.admissions[id] = newAdmission;
    // Initialize ledger for this admission
    if (!this.dataService.ledgers[ledger_id]) {
      this.dataService.ledgers[ledger_id] = [];
    }
    
    return newAdmission;
  }

  update(id: number, update: any) {
    if (!this.dataService.admissions[id]) throw new NotFoundException(`Admission ${id} not found`);
    this.dataService.admissions[id] = { ...this.dataService.admissions[id], ...update };
    return this.dataService.admissions[id];
  }
}
