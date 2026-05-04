import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class WardService {
  constructor(private dataService: DataService) {}

  findAll() {
    return this.dataService.wards;
  }

  findBeds(wardName: string) {
    const ward = this.dataService.wards.find((w) => w.name === wardName);
    if (!ward) throw new NotFoundException(`Ward ${wardName} not found`);
    return ward.beds;
  }

  updateBedStatus(wardName: string, bedNumber: string, status: string, patient?: string) {
    const ward = this.dataService.wards.find((w) => w.name === wardName);
    if (!ward) throw new NotFoundException(`Ward ${wardName} not found`);
    
    const bed = ward.beds.find((b) => b.number === bedNumber);
    if (!bed) throw new NotFoundException(`Bed ${bedNumber} not found in ward ${wardName}`);
    
    bed.status = status;
    bed.patient = patient;
    return bed;
  }
}
