import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // an tasks array to access from the controller will be fetching from database later

    getAllTasks(): Task[] {
        return this.tasks; // since getAllTasks is with in the class it has access to tasks array even though it is defined as private
    }
}