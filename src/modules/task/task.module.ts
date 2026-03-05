import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, ...mysqlProvider, PrismaService],
  exports: [...mysqlProvider, TaskService],
})
export class TaskModule {}
