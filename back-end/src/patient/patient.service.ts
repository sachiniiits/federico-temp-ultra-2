import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(private dataService: DataService) {}

  findAll() {
    return this.dataService.patientDirectory;
  }

  findOne(id: string) {
    const patient = this.dataService.patientDirectory.find((p) => p.id === id);
    if (!patient) throw new NotFoundException(`Patient with ID ${id} not found`);
    return patient;
  }

  create(createPatientDto: CreatePatientDto) {
    const newPatient = {
      ...createPatientDto,
      id: createPatientDto.id || `FED-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    this.dataService.patientDirectory.push(newPatient);
    return newPatient;
  }

  update(id: string, updatePatient: any) {
    const index = this.dataService.patientDirectory.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Patient with ID ${id} not found`);
    this.dataService.patientDirectory[index] = { ...this.dataService.patientDirectory[index], ...updatePatient };
    return this.dataService.patientDirectory[index];
  }

  remove(id: string) {
    const index = this.dataService.patientDirectory.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Patient with ID ${id} not found`);
    const removed = this.dataService.patientDirectory.splice(index, 1);
    return removed[0];
  }
}
