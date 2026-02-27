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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundError } from 'rxjs';
import { Console } from 'console';
import { Task } from './entities/task.entite';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('api/task')
@ApiTags('Task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public async getTask(): Promise<Task[]> {
    return await this.taskSvc.listTask();
  }

  @Get(':id')
  @HttpCode(200)
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    const result = await this.taskSvc.getTaskById(id);
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
  public insertTask(@Body() task: CreateTaskDto): Promise<Task> {
    const result = this.taskSvc.insert(task);

    if (result == undefined) {
      throw new HttpException(
        'Tarea no registrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.taskSvc.insert(task);
  }

  @Put('/:id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    console.log('Tarea a actualizar', task);

    return this.taskSvc.update(id, task);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    console.log(id);

    const result = await this.taskSvc.delete(id);

    console.log(result)

    if (!result) {
      //Devolver un código de estado
      throw new HttpException("No se puede eliminar la tarea", HttpStatus.NOT_FOUND)
    }

    return result;
  }
}
