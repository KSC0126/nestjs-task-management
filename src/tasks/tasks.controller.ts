import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get() // letting nest js know it is a get class or using @Get decorator to make get call
    getAllTasks() {
        return this.tasksService.getAllTasks(); // return a response with tasks array
    }
}
