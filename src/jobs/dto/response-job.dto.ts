import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import * as moment from 'moment';

@Exclude()
export class ResponseJobDto {
  @Expose()
  @IsInt()
  id: number = null;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  description: string = '';

  @Expose()
  @IsString()
  company: string = '';

  @Expose()
  @IsInt()
  salary: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Expose()
  @Transform(({ value }) => (value ? moment(value).format('DD/MM/YYYY') : ''))
  createdAt: Date | string;

  @Expose()
  @IsString({ each: true })
  @IsArray()
  @Transform(({ value }) =>
    value.map((e) =>
      e
        .split(' ')
        .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' '),
    ),
  )
  skills: string[];
}
