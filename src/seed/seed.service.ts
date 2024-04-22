import { Injectable } from '@nestjs/common';
import { JobsService } from '../jobs/jobs.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly jobsService: JobsService) {}

  async runSeed() {
    await this.insertNewJobs();
    return 'SEED EXECUTED';
  }

  private async insertNewJobs() {
    await this.jobsService.removeAll();
    const seedJobs = initialData.jobs;

    const insertPromises = [];

    seedJobs.forEach((job) => {
      insertPromises.push(this.jobsService.create(job));
    });
    await Promise.all(insertPromises);
    return true;
  }
}
