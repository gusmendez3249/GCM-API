import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'El nombre debe de ser una cadena' })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString({ message: 'La descripción es una cadena' })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  description: string;

  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  priority: boolean;
}
