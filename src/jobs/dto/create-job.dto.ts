import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @MinLength(1)
  company: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  salary?: number;

  @IsString()
  @MinLength(1)
  country: string;

  @IsString({ each: true })
  @IsArray()
  skills: string[];
}
