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

@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private userSvc: UserService) {}

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
  public insertUser(@Body() task: CreateUserDto): Promise<User> {
    const result = this.userSvc.insert(task);

    if (result == undefined) {
      throw new HttpException(
        'Tarea no registrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.userSvc.insert(task);
  }

  @Put('/:id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    console.log('Tarea a actualizar', user);

    return this.userSvc.update(id, user);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<Boolean> {
    try{
      await this.userSvc.delete(id);
    }
    catch(error){
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }

    return true;
  }
}
