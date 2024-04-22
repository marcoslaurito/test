import { Type } from 'class-transformer';
import { IsArray, IsInt, IsSemVer, IsString } from 'class-validator';

export class ExternalJob {
  @IsInt()
  id: number = null;

  @IsString()
  name: string;

  @IsString()
  description: string = '';

  @IsString()
  company: string = '';

  @IsInt()
  @Type(() => Number)
  salary: number;

  @IsString()
  country: string;

  @IsString()
  createdAt: string = '';

  @IsString({ each: true })
  @IsArray()
  skill: string[];

  @IsString({ each: true })
  @IsArray()
  skillLC: string[];
}

export class ExternalResponseDto {
  @IsArray()
  jobs: ExternalJob[];
}
