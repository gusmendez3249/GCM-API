import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Connection } from 'mysql2';
import { User } from './entities/user.entitie';
import { UpdateUserDto } from './dto/update-task.dto';
import { Result } from 'pg';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('MYSQL_CONNECTION') private db: any,
    private prisma: PrismaService
  ) {}

  public async getUsers(): Promise<User[]>{
    const user = await this .prisma.user.findMany();
    
    return user;
  }
  private user: any[] = [];

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user;
  }
  
  async insert(user: CreateUserDto): Promise<User> {

    return await this.prisma.user.create({
      data: user, 
    });
  }

  async update(id: number, userUpdate: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: userUpdate
    });

    return user;
  }
  async delete(id: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: {id}
    })

    return user
  }
}
