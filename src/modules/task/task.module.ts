import { Module } from '@nestjs/common';
import { arrayBuffer } from 'stream/consumers';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { mysqlProvider } from 'src/common/providers/mysql.provider';

@Module({
  controllers: [TaskController],
  providers: [TaskService, ...mysqlProvider],
  exports: [...mysqlProvider, TaskService],
})
export class TaskModule {}
