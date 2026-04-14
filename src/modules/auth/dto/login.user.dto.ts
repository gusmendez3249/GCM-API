// src/auth/dto/login.user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'El username debe ser una cadena' })
  @IsNotEmpty({ message: 'El username es requerido' })
  @MinLength(3, { message: 'El username debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El username no debe exceder 100 caracteres' })
  @ApiProperty({ description: 'Nombre de usuario', example: 'Gus' })
  username: string;

  @IsString({ message: 'La contraseña debe ser una cadena' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(3, { message: 'La contraseña debe tener al menos 3 caracteres' })
  @MaxLength(250, { message: 'La contraseña no debe exceder 250 caracteres' })
  @ApiProperty({ description: 'Contraseña del usuario', example: '1234w4' })
  password: string;
}
