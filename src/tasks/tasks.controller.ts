import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get() // letting nest js know it is a get class or using @Get decorator to make get call
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks(); // return a response with tasks array
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string): Task {
        console.log('description', description);
        return this.tasksService.createTask(title, description);
    }
}
