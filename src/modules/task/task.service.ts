import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TaskService{

    private task : any[] = [];

    listTask(): any [] {
        return this.task;
    }
    getTaskById(id: number): any{
        var task = this.task.find(t => t.id = id);
        return task;
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