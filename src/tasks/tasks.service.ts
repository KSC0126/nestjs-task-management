import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // an tasks array to access from the controller will be fetching from database later

    getAllTasks(): Task[] {
        return this.tasks; // since getAllTasks is with in the class it has access to tasks array even though it is defined as private
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task; // by returning a newly created object front end don't need make an extra call to know which object is created
    }
}