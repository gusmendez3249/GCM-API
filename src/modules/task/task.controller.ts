import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public async getTask(): Promise<any> {
    return await this.taskSvc.listTask();
  }

  @Get(':id')
  public async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return  await this.taskSvc.getTaskById(id);
  }

  @Post()
  public insertTask(@Body() task: CreateTaskDto) {
    return this.taskSvc.insert(task);
  }

  @Put('/:id')
  public update(@Param('id', ParseIntPipe) id: number, @Body() task: any) {
    return this.taskSvc.update(id, task);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.taskSvc.delete(id);
  }
}
