import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Connection } from 'mysql2';
import { Task } from './entities/task.entite';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Result } from 'pg';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject('MYSQL_CONNECTION') private db: any,
    private prisma: PrismaService
  ) {}

  public async getTasks(userId: number): Promise<Task[]>{
    const tasks = await this.prisma.task.findMany({
      where: { user_id: userId }
    });

    console.log(tasks);
    
    return tasks;
  }
  private task: any[] = [];

  async getTaskById(id: number, userId: number): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({
      where: { id, user_id: userId }
    });

    return task;
  }
  
  async insert(task: CreateTaskDto): Promise<Task> {

    return await this.prisma.task.create({
      data: task, 
    });
  }

  async update(id: number, userId: number, taskUpdate: UpdateTaskDto): Promise<Task> {
    const existing = await this.getTaskById(id, userId);
    if (!existing) {
      throw new NotFoundException('Task not found or unauthorized');
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: taskUpdate
    });

    return task;
  }
  async delete(id: number, userId: number): Promise<Task> {
    const existing = await this.getTaskById(id, userId);
    if (!existing) {
      throw new NotFoundException('Task not found or unauthorized');
    }

    const task = await this.prisma.task.delete({
      where: {id}
    })

    return task
  }
}
