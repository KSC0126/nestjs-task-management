import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get() // letting nest js know it is a get class or using @Get decorator to make get call
    getTasks(@Query() filterDto: TasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksByFilter(filterDto);
        } else {
            return this.tasksService.getAllTasks(); // return a response with tasks array
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        const validTask = this.tasksService.getTaskById(id);

        if (!validTask) {
            throw new NotFoundException(`task with "${id}" does not exist`);
        }
        return validTask;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTask(id, status);
    }

}
