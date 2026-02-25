import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Connection } from 'mysql2';
import { Task } from './entities/task.entite';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('MYSQL_CONNECTION') private db: any) {}

  private task: any[] = [];

  async listTask(): Promise<any> {
    const query = `SELECT * FROM tasks;`;
    const [result]: any = await this.db.query(query);

    return result;
  }
  async getTaskById(id: number): Promise<any> {
    const query = `SELECT * FROM tasks WHERE id = '${id}'`;
    const [result]: any = await this.db.query(query);

    return result[0];
  }
  async insert(task: CreateTaskDto): Promise<Task> {
    //Agregar query
    const sql = `INSERT INTO tasks (name, description, priority, user_id) VALUES('${task.nombre}', '${task.descripcion}','${task.prioridad}', '${task.user_id}')`;

    const [result] = await this.db.query(sql);

    const insertId = result.insertId;

    const row = await this.getTaskById(insertId);

    return row;
  }
  async update(id: number, taskUpdate: UpdateTaskDto): Promise<any> {
        const task = await this.getTaskById(id);

        task.name = taskUpdate.nombre ? taskUpdate.nombre : task.name
        task.descripcion = taskUpdate.descripcion ?? task.descripcion;
        task.prioridad = taskUpdate.prioridad ?? task.prioridad;

        // const sets = Object.keys(taskUpdate)
        // .map(key => `${key} = '${ taskUpdate[key] }'`).join(',')

        //!git commit -a -m "fix: CRUD a base de datos MYSQL (list, listById, insert)"

        return task;
        
  }
  delete(id: number): string {
    const array = this.task.filter((t) => t.id != id);
    this.task = array;
    return 'Task deleted';
  }
}
