import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobSkill } from './entities/job-skill.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [JobsController],
  providers: [JobsService, ConfigService],
  imports: [TypeOrmModule.forFeature([Job, JobSkill]), HttpModule],
  exports: [JobsService, TypeOrmModule],
})
export class JobsModule {}
