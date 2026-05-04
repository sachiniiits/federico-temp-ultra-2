import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class DoctorService {
  constructor(private dataService: DataService) {}

  findAll() {
    return this.dataService.doctors;
  }

  findOne(id: string) {
    const doctor = this.dataService.doctors.find((d) => d.id === id);
    if (!doctor) throw new NotFoundException(`Doctor with ID ${id} not found`);
    return doctor;
  }

  create(doctor: any) {
    const newDoctor = {
      id: `D${Date.now()}`,
      status: 'Available',
      ...doctor,
    };
    this.dataService.doctors.push(newDoctor);
    return newDoctor;
  }

  update(id: string, updateDoctor: any) {
    const index = this.dataService.doctors.findIndex((d) => d.id === id);
    if (index === -1) throw new NotFoundException(`Doctor with ID ${id} not found`);
    this.dataService.doctors[index] = { ...this.dataService.doctors[index], ...updateDoctor };
    return this.dataService.doctors[index];
  }

  remove(id: string) {
    const index = this.dataService.doctors.findIndex((d) => d.id === id);
    if (index === -1) throw new NotFoundException(`Doctor with ID ${id} not found`);
    const removed = this.dataService.doctors.splice(index, 1);
    return removed[0];
  }
}
