import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService{

    listTask(): Array<string>{
        return ["Noe","Gus","Omar"];
    }
}