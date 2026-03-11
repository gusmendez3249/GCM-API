import { Inject, Injectable } from '@nestjs/common';
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

  public async getTasks(): Promise<Task[]>{
    const tasks = await this .prisma.task.findMany();

    console.log(tasks);
    
    return tasks;
  }
  private task: any[] = [];

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id }
    });

    return task;
  }
  
  async insert(task: CreateTaskDto): Promise<Task> {

    return await this.prisma.task.create({
      data: task, 
    });
  }

  async update(id: number, taskUpdate: UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id },
      data: taskUpdate
    });

    return task;
  }
  async delete(id: number): Promise<Task> {
    const task = await this.prisma.task.delete({
      where: {id}
    })

    return task
  }
}
