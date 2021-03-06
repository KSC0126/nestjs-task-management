import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidator } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    // @Get() // letting nest js know it is a get class or using @Get decorator to make get call
    // getTasks(@Query(ValidationPipe) filterDto: TasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksByFilter(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks(); // return a response with tasks array
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        console.log('ids', id);
        const validTask = this.tasksService.getTaskById(id);
        return validTask;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): void {
        this.tasksService.deleteTaskById(id);
    }

    // @Patch('/:id/status')
    // updateStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidator) status: TaskStatus): Task {
    //     return this.tasksService.updateTask(id, status);
    // }

}
