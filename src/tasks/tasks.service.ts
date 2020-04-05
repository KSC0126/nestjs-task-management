import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository, // DI taskRepository
    ) { }
    // private tasks: Task[] = []; // an tasks array to access from the controller will be fetching from database later

    // getAllTasks(): Task[] {
    //     return this.taskRepository.find(); // since getAllTasks is with in the class it has access to tasks array even though it is defined as private
    // }

    // getTasksByFilter(filterDto: TasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         console.log(status, ':', tasks.filter(task => task.status === status));
    //         tasks = tasks.filter(task => task.status === status)
    //     }
    //     if (search) {
    //         console.log(search);
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search),
    //         );
    //     }
    //     return tasks;
    // }
    // getTaskById(id: string): Task {
    //     return this.tasks.find(task => task.id === id);
    // }
    async getTaskById(id: number): Promise<Task> {
        const validTask = await this.taskRepository.findOne(id);
        if (!validTask) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
        return validTask;
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto; // we need to deconstruct the DTO to use inside the service
    //     const task: Task = {
    //         id: uuid(),
    //         title: title,
    //         description: description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task; // by returning a newly created object front end don't need make an extra call to know which object is created
    // }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById(id: number): Promise<void> {
        const deletedTask = await this.taskRepository.delete(id);

        if (deletedTask.affected === 0) {
            console.log(deletedTask);
            // throw new NotFoundException('checking');
        }
    }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}