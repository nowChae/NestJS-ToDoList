import { IsNotEmpty } from 'class-validator';

export class CreateTodoRequest {
  @IsNotEmpty()
  title: string;
}
