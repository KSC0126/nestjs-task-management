import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // an tasks array to access from the controller will be fetching from database later

    getAllTasks(): Task[] {
        return this.tasks; // since getAllTasks is with in the class it has access to tasks array even though it is defined as private
    }

    getTasksByFilter(filterDto: TasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            console.log(status, ':', tasks.filter(task => task.status === status));
            tasks = tasks.filter(task => task.status === status)
        }
        if (search) {
            console.log(search);
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search),
            );
        }
        return tasks;
    }
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto; // we need to deconstruct the DTO to use inside the service
        const task: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task; // by returning a newly created object front end don't need make an extra call to know which object is created
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTask(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}