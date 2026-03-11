import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundError } from 'rxjs';
import { Console } from 'console';
import { User } from './entities/user.entitie';
import { UpdateUserDto } from './dto/update-task.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UtilService } from 'src/common/services/util.service';

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(
    private userSvc: UserService,
    private readonly utilSvc: UtilService
  ) {}

   @Get('prisma')
  public async getUserPrisma(): Promise<User[]> {
    return await this.userSvc.getUsers();
  }

  @Get()
  
  public async getUser(): Promise<User[]> {
    return await this.userSvc.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  public async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    const result = await this.userSvc.getUserById(id);
    console.log(result);
    if (result == undefined) {
      //throw new NotFoundException(`Tarea con id ${id} no encontrada`)
      throw new HttpException(
        `Tarea con id ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
    //return  await this.taskSvc.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: 'inserta una tarea en la base de datos' })
  public async insertUser(@Body() user: CreateUserDto): Promise<User> {
    const encryptedPassword = await this.utilSvc.hashPassword(user.password)
    user.password = encryptedPassword
    const result = this.userSvc.insert(user);

    if (result == undefined) {
      throw new HttpException(
        'Tarea no registrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.userSvc.insert(user);
  }

  @Put('/:id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    console.log('User a actualizado', user);

    return this.userSvc.update(id, user);
  }


    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
      // Buscamos el usuario incluyendo sus tareas
      const user = await this.userSvc.getUserById(id);

      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      // Validamos si tiene tareas 
      if (user.tasks && user.tasks.length > 0) {
        throw new HttpException(
          'No se puede eliminar el usuario porque tiene tareas asociadas',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Ejecutamos el borrado
      return await this.userSvc.delete(id);
    }

    @Get(':id/tasks')
    @ApiOperation({ summary: 'Obtiene todas las tareas de un usuario específico' })
    public async getTasksByUser(
      @Param('id', ParseIntPipe) id: number,
    ): Promise<any[]> {
      const tasks = await this.userSvc.getTasksByUserId(id);
      
      if (tasks === null) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }
      
      return tasks;
    }
}
