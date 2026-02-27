import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
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
  @ApiProperty({ description: 'name', example: 'Calculo' })
  nombre: string;

  @IsString({ message: 'La descripción es una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'description', example: 'Calculo del Semetre 2' })
  descripcion: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'priority', example: 'True' })
  prioridad: boolean;

  @IsNumber()
  @IsInt()
  @ApiProperty({ description: 'user_id', example: '1' })
  user_id: number;
}
