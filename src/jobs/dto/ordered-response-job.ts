import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class OrderedResponseJobDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  company: string;

  @Expose()
  @IsInt()
  salary: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Expose()
  createdAt: Date | string;

  @Expose()
  @IsString({ each: true })
  @IsArray()
  skills: string[];
}
