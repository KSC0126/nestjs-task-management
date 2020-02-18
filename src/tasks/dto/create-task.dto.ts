import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
    @IsNotEmpty() // by decorating it with IsNotEmpty we can make sure that title is not empty 
    title: string;
    @IsNotEmpty()
    description: string;
}