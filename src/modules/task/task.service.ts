import { Inject, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Connection } from 'mysql2';


@Injectable()
export class TaskService{

    constructor(
        @Inject('MYSQL_CONNECTION') private db: any
    ){}

    private task : any[] = [];

    async listTask(): Promise<any> {
        const query =`SELECT * FROM tasks;`
        const [result]: any =  await this.db.query(query);

        return result;
    }
    async getTaskById(id: number): Promise<any>{
        const query = `SELECT * FROM tasks WHERE id = '${ id }'`;
        const [result]: any = await this.db.query(query);

        return result ;

    }
    insert(task: CreateTaskDto): any {

        var insertTask = this.task.push({
            ...task,
            id: this.task.length + 1
        })
        // this.task.push({
        //     ...task,
        //     id: this.task.length + 1
        // })
        return insertTask;
    }
    update(id: number, task: any){
        const tasUpdate = this.task.map(t => {
            if(t.id = id){
                if(task.Nombre) t.Nombre = task.Nombre
                if(task.Descripcion) t.Descripcion = task.Descripcion
                if(task.Prioridad) t.Prioridad = task.Prioridad  
            }
      
            return t;
        });
        return tasUpdate;
    }
    delete(id: number): string {
        const array = this.task.filter(t => t.id != id);
        this.task = array;
        return "Task deleted";
    }
}