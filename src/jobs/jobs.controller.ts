import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SearchDto } from './dto/search-job.dto';
import { ResponseJobDto } from './dto/response-job.dto';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { OrderedResponseJobDto } from './dto/ordered-response-job';
import { CombinedResponseJobDto } from './dto/combined-response-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  async findAll(@Query() searchDto: SearchDto): Promise<ResponseJobDto[]> {
    const jobs = await this.jobsService.findAll(searchDto);
    const unorderedResults = plainToInstance(ResponseJobDto, jobs, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    return unorderedResults;
    // return plainToInstance(OrderedResponseJobDto, unorderedResults, {
    //   excludeExtraneousValues: true,
    //   exposeUnsetFields: false,
    // });
    // return this.jobsService.findAllExt();
  }

  @Get('search')
  async search(
    @Query() searchDto: SearchDto,
  ): Promise<CombinedResponseJobDto[]> {
    const jobs = await this.jobsService.search(searchDto);
    const unorderedResults = plainToInstance(CombinedResponseJobDto, jobs, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    return plainToInstance(OrderedResponseJobDto, unorderedResults, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ResponseJobDto> {
    const job = await this.jobsService.findOnePlain(+id);
    return plainToInstance(ResponseJobDto, job);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.jobsService.remove(+id);
  }
}
