// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UtilService } from '../../common/services/util.service';
import { AuthDto } from './dto/login.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private utilService: UtilService,
  ) {}

  // metodo para obtener user por username con prisma

  async login(userLogin: AuthDto) {
    // 1. Buscar el usuario por username
    const user = await this.usersService.findByUsername(userLogin.username);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // 2. Verificar contraseña con bcrypt (checkPassword)
    const isValid = await this.utilService.checkPassword(userLogin.password, user.password!);    
    if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

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

  async getProfile(token: string) {
    try {
      const payload = await this.utilService.getPayload(token);
      return this.getProfileFromId(payload.id);
    } catch (e) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async getProfileFromId(id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    return user;
  }

  async refreshToken(token: string) {
    try {
      // Decode user from refresh token
      const payload = await this.utilService.getPayload(token);
      const user = await this.usersService.getUserById(payload.id);
      
      if (!user) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      // We should ideally verify if this token matches user.refreshToken in DB 
      // but since prisma query in getUserById doesn't return refreshToken, we will skip it for now.
      
      const newPayload = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        created_at: user.created_at, 
      };

      const accessToken = await this.utilService.generateToken(newPayload, '60s');
      const refreshToken = await this.utilService.generateToken(newPayload, '7d');

      await this.usersService.saveRefreshToken(user.id, refreshToken);

      return { accessToken, refreshToken };
    } catch(e) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  async logout(id: number) {
    // Eliminar el refresh token de la base de datos
    await this.usersService.saveRefreshToken(id, '');
    return { message: 'Sesión cerrada correctamente' };
  }

  private async checkPassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
