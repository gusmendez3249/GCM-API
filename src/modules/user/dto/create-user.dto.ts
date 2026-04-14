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
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no debe exceder 100 caracteres' })
  @ApiProperty({ description: 'name', example: 'Gustavo' })
  name: string;

  @IsString({ message: 'Los apellidos son una cadena' })
  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  @MinLength(3, { message: 'Los apellidos deben tener al menos 3 caracteres' })
  @MaxLength(250, { message: 'Los apellidos no deben exceder 250 caracteres' })
  @ApiProperty({ description: 'lastname', example: 'Cruz Mendez' })
  lastname: string;

  @IsString({ message: 'El nombre de usuario es una cadena' })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  @MaxLength(250, { message: 'El nombre de usuario no debe exceder 250 caracteres' })
  @ApiProperty({ description: 'username', example: 'Gus' })
  username: string;

  @IsString({ message: 'La contraseña es una cadena' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(250, { message: 'La contraseña no debe exceder 250 caracteres' })
  @ApiProperty({ description: 'password', example: '1234w4' })
  password: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @ApiProperty({ description: 'rol_id', example: 1, required: false })
  rol_id?: number;
}
