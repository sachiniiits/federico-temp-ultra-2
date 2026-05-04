import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class RequestService {
  constructor(private dataService: DataService) {}

  findAllPreRequests() {
    return this.dataService.preRequests;
  }

  createPreRequest(request: any) {
    const newRequest = {
      ...request,
      id: request.id || `PRE-REQ-${Date.now()}`,
      appointmentId: request.appointmentId || `PRE-APT-${Date.now()}`,
    };
    this.dataService.preRequests.push(newRequest);
    return newRequest;
  }

  updatePreRequest(id: string, update: any) {
    const index = this.dataService.preRequests.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException(`Request ${id} not found`);
    this.dataService.preRequests[index] = { ...this.dataService.preRequests[index], ...update };
    return this.dataService.preRequests[index];
  }
}
