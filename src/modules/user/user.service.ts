import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Connection } from 'mysql2';
import { User } from './entities/user.entitie';
import { UpdateUserDto } from './dto/update-task.dto';
import { Result } from 'pg';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('MYSQL_CONNECTION') private db: any,
    private prisma: PrismaService
  ) {}

  public async getUsers(excludeId?: number): Promise<User[]>{
    const whereClause = excludeId ? { id: { not: excludeId } } : {};
    const user = await this.prisma.user.findMany({
      where: whereClause,
      orderBy:[{name: "asc"}],
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: false,
        created_at: true,
        rol: { select: { id: true, description: true } }
      }  
    });
    
    return user;
  }
  private user: any[] = [];

  async getUserById(id: number): Promise<any | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        created_at: true,
        tasks: true,
        rol: { select: { id: true, description: true } },
      },
    });
  }

    async getTasksByUserId(id: number): Promise<any[] | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true }
    });
    
    if (!user) return null;
    return user.tasks;
  }
  async insert(user: CreateUserDto): Promise<User> {
    try {
      const { rol_id, ...rest } = user;
      return await this.prisma.user.create({
        data: {
          ...rest,
          ...(rol_id ? { rol: { connect: { id: rol_id } } } : {}),
        },
        select: {
          id: true,
          name: true,
          lastname: true,
          username: true,
          created_at: true,
          tasks: true,
          rol: { select: { id: true, description: true } },
        },
      }) as unknown as User;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }
      throw error;
    }
  }


async update(id: number, userUpdate: UpdateUserDto): Promise<User> {
    try {
      const { rol_id, ...rest } = userUpdate;
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          ...rest,
          ...(rol_id !== undefined ? { rol: { connect: { id: rol_id } } } : {}),
        },
        select: {
          id: true,
          name: true,
          lastname: true,
          username: true,
          created_at: true,
          tasks: true,
          rol: { select: { id: true, description: true } },
        },
      });
      return user as unknown as User;
    } catch (error) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }


  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

    // Busca por username e incluye password para validación
  async findByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: true, 
        created_at: true,
      },
    });
  }

  // Guarda el refreshToken en la DB
  async saveRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }

  // Guarda el hash en la DB
  async saveHash(id: number, hash: string | null): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { hash },
    });
  }


}
