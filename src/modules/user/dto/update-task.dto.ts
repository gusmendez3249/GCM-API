import { ApiProperty } from '@nestjs/swagger';
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

export class UpdateUserDto {

  @IsOptional()
  @IsString({ message: 'El nombre debe de ser una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ description: 'name', example: 'Gustavo' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Los apellidos son una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'lastname', example: 'Cruz Mendez' })
  lastname: string;

  @IsOptional()
  @IsString({ message: 'El nombre de usuario es una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'username', example: 'Gus' })
  username: string;

  @IsOptional()
  @IsString({ message: 'La contraseña es una cadena' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(250)
  @ApiProperty({ description: 'password', example: '1234w4' })
  password: string;
}
