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
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ description: 'name', example: 'Calculo' })
  name: string;

  @IsString({ message: 'La descripción es una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'description', example: 'Calculo del Semetre 2' })
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'priority', example: 'True' })
  priority: boolean;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @ApiProperty({ description: 'user_id', example: '1' })
  user_id: number;
}
