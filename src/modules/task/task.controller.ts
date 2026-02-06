import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public getTask(): Array<string> {
    return this.taskSvc.listTask();
  }

  @Get(":id")
  public getTaskById(@Param("id") id: string) {
    return this.taskSvc.getTaskById(parseInt(id));
  }

  @Post()
  public insertTask(@Body() task: any){
    return this.taskSvc.insert(task);
  }

  @Put(":id")
  public update(@Param("id") id:string, @Body() task: any ){
    return this.taskSvc.update(parseInt(id),task);
  }

  @Delete(":id")
  public delete(@Param("id") id: string){
    console.log(id);
    return this.taskSvc.delete(parseInt(id));
  }
}
