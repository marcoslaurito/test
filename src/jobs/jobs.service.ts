import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { lastValueFrom, map } from 'rxjs';
import { JobSkill } from './entities/job-skill.entity';
import { SearchDto } from './dto/search-job.dto';
import { ExternalJob } from './dto/external-response-job.dto';
import { HttpService } from '@nestjs/axios';
import { ResponseJobDto } from './dto/response-job.dto';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(JobSkill)
    private readonly jobSkillRepository: Repository<JobSkill>,
    private readonly dataSource: DataSource,
    private readonly httpService: HttpService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    try {
      const { skills, ...jobProps } = createJobDto;

      const job = this.jobRepository.create({
        ...jobProps,
        skills: skills.map((skill) =>
          this.jobSkillRepository.create({ skillName: skill }),
        ),
      });

      await this.jobRepository.save(job);

      return { ...job, skills };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(searchDto: SearchDto) {
    const { name, salary_min, salary_max, country, skill } = searchDto;
    try {
      const query = this.jobRepository
        .createQueryBuilder('jobs')
        .leftJoin('jobs.skills', 'skill')
        .leftJoinAndSelect('jobs.skills', 'skillSelect');
      if (name)
        query.andWhere('name LIKE :name', {
          name: `%${name ? name : undefined}%`,
        });
      if (salary_min || salary_max)
        query.andWhere('jobs_salary BETWEEN :smin AND :smax', {
          smin: salary_min ? salary_min : 0,
          smax: salary_max ? salary_max : Number.MAX_VALUE,
        });
      if (country)
        query.andWhere('country = :country', {
          country: country.toLowerCase(),
        });
      if (skill)
        query.andWhere('skill.skillName = :skName', {
          skName: skill ? skill : undefined,
        });
      const jobs = await query.getMany();

      // const jobsId = await this.jobRepository.find({
      //   take: limit,
      //   skip: offset,
      //   select: {
      //     id: true,
      //   },
      //   relations: {
      //     skills: true,
      //   },
      //   where: {
      //     name: name ? Like(`%${name}%`) : undefined,
      //     salary: salary_min
      //       ? Between(salary_min, salary_max ? salary_max : Number.MAX_VALUE)
      //       : salary_max
      //         ? Between(0, salary_max)
      //         : undefined,
      //     country: country ? country.toUpperCase() : undefined,
      //     skills: { skillName: skill ? skill.toUpperCase() : undefined },
      //   },
      // });

      // const jobs = await this.jobRepository.find({
      //   take: limit,
      //   skip: offset,
      //   relations: {
      //     skills: true,
      //   },
      //   where: {
      //     id: In(await jobsId.map((job) => job.id)),
      //   },
      // });

      return jobs.map(({ skills, ...props }) => ({
        ...props,
        skills: skills.map((skill) => skill.skillName),
      }));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error searching Jobs!');
    }
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOneBy({ id });
    if (!job) {
      throw new NotFoundException(`Job with id: ${id} not found.`);
    }
    return job;
  }

  async findOnePlain(id: number) {
    const { skills, ...props } = await this.findOne(id);

    return {
      ...props,
      skills: skills.map((skill) => skill.skillName),
    };
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const { skills, ...otherPropsToUpdate } = updateJobDto;

    const job = await this.jobRepository.preload({
      id: id,
      ...otherPropsToUpdate,
    });

    if (!job) {
      throw new NotFoundException(`Job with id: ${id} not found.`);
    }

    const queryR = this.dataSource.createQueryRunner();
    await queryR.connect();
    await queryR.startTransaction();

    try {
      if (skills) {
        await queryR.manager.delete(JobSkill, { job: { id: id } });

        job.skills = skills.map((skill) =>
          this.jobSkillRepository.create({ skillName: skill }),
        );
      }

      await queryR.manager.save(job);
      await queryR.commitTransaction();
      return this.jobRepository.findOneBy({ id: id });
    } catch (error) {
      await queryR.rollbackTransaction();
      console.log(error);
      throw new InternalServerErrorException('Error updating Job!.');
    } finally {
      await queryR.release();
    }
  }

  async remove(id: number) {
    const jobToRemove = await this.findOne(id);
    await this.jobRepository.remove(jobToRemove);
  }

  private handleExceptions(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException('Error creating or updating Job!');
  }

  async removeAll() {
    try {
      await this.dataSource
        .createQueryRunner()
        .query("UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'Jobs'");
      return await this.jobRepository.clear();
    } catch (error) {
      throw new InternalServerErrorException('Error removing all Jobs!.');
    }
  }

  async search(searchDto: SearchDto): Promise<Job[]> {
    const { name, salary_min, salary_max, country, skill } = searchDto;

    try {
      // const queryRepo = async () => {
      //   const query = this.jobRepository
      //     .createQueryBuilder('jobs')
      //     .leftJoin('jobs.skills', 'skill')
      //     .leftJoinAndSelect('jobs.skills', 'skillSelect');
      //   if (name)
      //     query.andWhere('name LIKE :name', {
      //       name: `%${name ? name : undefined}%`,
      //     });
      //   if (salary_min || salary_max)
      //     query.andWhere('jobs_salary BETWEEN :smin AND :smax', {
      //       smin: salary_min ? salary_min : 0,
      //       smax: salary_max ? salary_max : Number.MAX_VALUE,
      //     });
      //   if (country)
      //     query.andWhere('country = :country', {
      //       country: country.toLowerCase(),
      //     });
      //   if (skill)
      //     query.andWhere('skill.skillName = :skName', {
      //       skName: skill ? skill : undefined,
      //     });
      //   const jobs = await query.getMany();

      //   // const jobsId = await this.jobRepository.find({
      //   //   take: limit,
      //   //   skip: offset,
      //   //   select: {
      //   //     id: true,
      //   //   },
      //   //   relations: {
      //   //     skills: true,
      //   //   },
      //   //   where: {
      //   //     name: name ? Like(`%${name}%`) : undefined,
      //   //     salary: salary_min
      //   //       ? Between(salary_min, salary_max ? salary_max : Number.MAX_VALUE)
      //   //       : salary_max
      //   //         ? Between(0, salary_max)
      //   //         : undefined,
      //   //     country: country ? country.toUpperCase() : undefined,
      //   //     skills: { skillName: skill ? skill.toUpperCase() : undefined },
      //   //   },
      //   // });

      //   // const jobs = await this.jobRepository.find({
      //   //   take: limit,
      //   //   skip: offset,
      //   //   relations: {
      //   //     skills: true,
      //   //   },
      //   //   where: {
      //   //     id: In(await jobsId.map((job) => job.id)),
      //   //   },
      //   // });

      //   return jobs.map(({ skills, ...props }) => ({
      //     ...props,
      //     skills: skills.map((skill) => skill.skillName),
      //   }));
      // };

      const results = (await Promise.allSettled([
        this.findAll(searchDto),
        this.fetchFromExternalAPI(searchDto),
      ])) as { status: 'fulfilled' | 'rejected'; value: any[] }[];

      const filtered = results.filter((p) => p.status === 'fulfilled');
      return filtered.map((e) => e.value).flat();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error searching Jobs!');
    }
  }

  async findAllExt() {
    return this.fetchFromExternalAPI({});
  }

  private async fetchFromExternalAPI(
    externalSearchDto: SearchDto,
  ): Promise<ResponseJobDto[]> {
    const { name, salary_min, salary_max, country, skill } = externalSearchDto;

    try {
      const url = `${this.configService.get<string>('EXTERNAL_API_BASE_URL')}/${this.configService.get<string>('EXTERNAL_API_JOB_ENDPOINT')}?${name ? 'name=' + name : ''}&${salary_min ? 'salary_min=' + salary_min : ''}&${salary_max ? 'salary_max=' + salary_max : ''}&${country ? 'country=' + country : ''}`;

      const results: ExternalJob[] = await lastValueFrom(
        this.httpService.get(url).pipe(
          map((response) => response.data),
          map((data) =>
            data.map((e) => {
              return {
                name: e[0],
                salary: e[1],
                country: e[2],
                skills: e[3],
                skillLC: e[3].map((sk) => sk.toLowerCase()),
              };
            }),
          ),
        ),
      );

      let r = results;

      if (skill) {
        r = results.filter((job) => job.skillLC.includes(skill.toLowerCase()));
      }

      r.map((job) => {
        delete job.skillLC;
        return job;
      });
      return plainToInstance(ResponseJobDto, r);
    } catch (error) {
      console.log(`Error fetching external jobs. Cause: ${error}`);
    }
  }
}
