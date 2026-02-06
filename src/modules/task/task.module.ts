import { Module } from "@nestjs/common";
import { arrayBuffer } from "stream/consumers";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
    controllers:[
        TaskController
    ],
    providers:[
        TaskService
    ]
})
export class TaskModule{}
