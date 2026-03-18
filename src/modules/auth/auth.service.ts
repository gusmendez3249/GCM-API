// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UtilService } from '../../common/services/util.service';
import { LoginUserDto } from './dto/login.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private utilService: UtilService,
  ) {}

  async login(userLogin: LoginUserDto) {
    // 1. Buscar el usuario por username
    const user = await this.usersService.findByUsername(userLogin.username);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // 2. Verificar contraseña con bcrypt (checkPassword)
    const isValid = await this.checkPassword(userLogin.password, user.password!);    if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

    // 3. Construir payload
    const payload = {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    created_at: user.created_at, 
    };

    // 4. Generar tokens
    const accessToken = await this.utilService.generateToken(payload, '60s');
    const refreshToken = await this.utilService.generateToken(payload, '7d');

    // 5. Guardar refreshToken en la DB
    await this.usersService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private async checkPassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
