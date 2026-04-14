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
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no debe exceder 100 caracteres' })
  name: string;

  @IsString({ message: 'La descripción es una cadena' })
  @IsOptional()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(250, { message: 'La descripción no debe exceder 250 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'La prioridad es requerida' })
  @IsOptional()
  @IsBoolean({ message: 'La prioridad debe ser un valor booleano' })
  priority: boolean;
}
