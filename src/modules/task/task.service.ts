import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService{

    listTask(): Array<string>{
        return ["Noe","Gus","Omar"];
    }
    getTaskById(id: number): string {
        return `Tarea con el id ${ id }`;
    }
    insert(task: any): string {
        return task;
    }
    update(id: number, task: any): string {
        return task;
    }
    delete(id: number): string {
        return `Tarea ${id} eliminada`;
    }
}