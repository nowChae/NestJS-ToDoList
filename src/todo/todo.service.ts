import { BadRequestException, Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoRequest } from './dto/create-todo-req.dto';
import { CreateTodoResponse } from './dto/create-todo-res.dto';
import { Todo } from './todo.entity';
import { ChangeTitleDtoRequest } from './dto/change-title-req.dto';
import { ChangeTitleDtoResponse } from './dto/change-title-res.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  getAllTodo(): Promise<Todo[]> {
    return this.todoRepository.findAllTodo();
  }

  getTodoById(id: number): Promise<Todo> {
    return this.todoRepository.findOneTodo(id);
  }

  createTodo(createTodoRequest: CreateTodoRequest, user: User): Promise<CreateTodoResponse> {
    const { title } = createTodoRequest;

    if (!title || title.trim() === '') {
      throw new BadRequestException(`할 일을 입력해주세요.`);
    }

    return this.todoRepository.createTodo(createTodoRequest, user);
  }

  async changeTitle(id: number, changeTitleRequest: ChangeTitleDtoRequest): Promise<ChangeTitleDtoResponse> {
    const findTodo: Todo = await this.getTodoById(id);
    const { title } = changeTitleRequest;
    if (!title || title.trim() === '') {
      throw new BadRequestException(`할 일을 입력해주세요.`);
    }

    return this.todoRepository.changeTitle(findTodo, changeTitleRequest);
  }

  async changeCompletes(id: number): Promise<void> {
    const findTodo: Todo = await this.getTodoById(id);
    return this.todoRepository.changeCompletes(findTodo);
  }

  async deleteTodo(id: number): Promise<void> {
    const findTodo: Todo = await this.getTodoById(id);
    return this.todoRepository.deleteTodo(findTodo);
  }
}
