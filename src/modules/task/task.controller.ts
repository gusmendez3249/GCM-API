import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public login(): Array<string> {
    return this.taskSvc.listTask();
  }
}
