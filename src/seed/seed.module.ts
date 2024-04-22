import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [JobsModule],
})
export class SeedModule {}
