import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './jobs/entities/job.entity';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_SQLITE_PATH,
      synchronize: true,
      autoLoadEntities: true,
      entities: [Job],
    }),
    JobsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
