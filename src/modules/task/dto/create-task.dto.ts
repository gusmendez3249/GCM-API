import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'El nombre debe de ser una cadena' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no debe exceder 100 caracteres' })
  @ApiProperty({ description: 'name', example: 'Calculo' })
  name: string;

  @IsString({ message: 'La descripción es una cadena' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(250, { message: 'La descripción no debe exceder 250 caracteres' })
  @ApiProperty({ description: 'description', example: 'Calculo del Semetre 2' })
  description: string;

  @IsNotEmpty({ message: 'La prioridad es requerida' })
  @IsBoolean({ message: 'La prioridad debe ser un valor booleano' })
  @ApiProperty({ description: 'priority', example: 'True' })
  priority: boolean;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @ApiProperty({ description: 'user_id', example: '1' })
  user_id: number;
}
