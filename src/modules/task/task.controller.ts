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

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public async getTask(): Promise<any> {
    return await this.taskSvc.listTask();
  }

  @Get(':id')
  @HttpCode(200)
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const result = await this.taskSvc.getTaskById(id);
    console.log(result)
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
  public insertTask(@Body() task: CreateTaskDto) {
      const result = this.taskSvc.insert(task);

      if (result == undefined) {
        throw new HttpException(
          "Tarea no registrada",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

    return this.taskSvc.insert(task);
  }

  @Put('/:id')
  public update(@Param('id', ParseIntPipe) id: number, @Body() task: any) {
    console.log("Tarea a actualizar", task)


    return this.taskSvc.update(id, task);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.taskSvc.delete(id);
  }
}
