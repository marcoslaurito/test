import {
  IsInt,
  IsOptional,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Type } from 'class-transformer';

@ValidatorConstraint({ name: 'isGreaterThan' })
class IsGreaterThan implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value > relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be greater than ${relatedPropertyName}`;
  }
}

export class SearchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  salary_min?: number;

  @IsOptional()
  @Type(() => Number)
  @Validate(IsGreaterThan, ['salary_min'], { message: '' })
  @IsInt()
  salary_max?: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  skill?: string;
}
