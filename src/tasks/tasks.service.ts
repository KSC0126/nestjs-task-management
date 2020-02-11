import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = []; // an tasks array to access from the controller will be fetching from database later

    getAllTasks() {
        return this.tasks; // since getAllTasks is with in the class it has access to tasks array even though it is defined as private
    }
}