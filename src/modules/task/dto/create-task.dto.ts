import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  isString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'El nombre debe de ser una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsString({ message: 'La descripción es una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  descripcion: string;

  @IsNotEmpty()
  @IsBoolean()
  prioridad: boolean;

  @IsNumber()
  @IsInt()
  user_id: number;
}
