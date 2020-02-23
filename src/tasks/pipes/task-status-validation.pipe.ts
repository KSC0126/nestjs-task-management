import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidator implements PipeTransform {
    readonly validStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]
    transform(value: any) {
        value = value.toUpperCase();
        if (!this.ValidateIncomingStatus(value)) {
            throw new BadRequestException(`${value} is not a valid status`)
        }

        return value;
    }

    private ValidateIncomingStatus(status: any) {
        return this.validStatuses.includes(status);
    }
}