import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe de ser una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ description: 'name', example: 'Gustavo' })
  name: string;

  @IsString({ message: 'Los apellidos son una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'lastname', example: 'Cruz Mendez' })
  lastname: string;

  @IsString({ message: 'El nombre de usuario es una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'username', example: 'Gus' })
  username: string;

  @IsString({ message: 'La contraseña es una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'password', example: '1234w4' })
  password: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @ApiProperty({ description: 'rol_id', example: 1, required: false })
  rol_id?: number;
}
