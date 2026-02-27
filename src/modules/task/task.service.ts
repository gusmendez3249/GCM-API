import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Connection } from 'mysql2';
import { Task } from './entities/task.entite';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Result } from 'pg';

@Injectable()
export class TaskService {
  constructor(@Inject('MYSQL_CONNECTION') private db: any) {}

  private task: any[] = [];

  async listTask(): Promise<Task[]> {
    const query = `SELECT * FROM tasks;`;
    const [result]: any = await this.db.query(query);

    return result;
  }
  async getTaskById(id: number): Promise<Task> {
    const query = `SELECT * FROM tasks WHERE id = '${id}'`;
    const [result]: any = await this.db.query(query);

    return result[0];
  }
  async insert(task: CreateTaskDto): Promise<Task> {
    //Agregar query
    const sql = `INSERT INTO tasks (name, description, priority, user_id) VALUES('${task.nombre}', '${task.descripcion}',${task.prioridad}, ${task.user_id})`;

    const [result] = await this.db.query(sql);

    const insertId = result.insertId;

    const row = await this.getTaskById(insertId);

    return row;
  }

  async update(id: number, taskUpdate: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);

    task.name = taskUpdate.nombre ?? task.name;
    task.description = taskUpdate.descripcion ?? task.description;
    task.priority = taskUpdate.prioridad ?? task.priority;

    const query = `
      UPDATE tasks
      SET name = ?, description = ?, priority = ?
      WHERE id = ?;
    `;

    const values = [task.name, task.description, task.priority, id];

    const [result]: any = await this.db.query(query, values);

    console.log(result.affectedRows);

    return await this.getTaskById(id);
  }
  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM tasks WHERE id = ${id}`;
    const [result] = await this.db.query(query);

    console.log(result.affectedRows);

    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }
}
