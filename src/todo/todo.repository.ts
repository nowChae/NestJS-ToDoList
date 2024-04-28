import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoRequest } from './dto/create-todo-req.dto';
import { CreateTodoResponse } from './dto/create-todo-res.dto';
import { ChangeTitleDtoRequest } from './dto/change-title-req.dto';
import { ChangeTitleDtoResponse } from './dto/change-title-res.dto';
import { User } from 'src/auth/user.entity';

@CustomRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async findAllTodo(): Promise<Todo[]> {
    return this.find();
  }

  async findOneTodo(id: number): Promise<Todo> {
    const todo = await this.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`ID가 ${id}인 할 일 을 찾을 수 없습니다.`);
    }
    return todo;
  }

  async createTodo(createTodoRequest: CreateTodoRequest, user: User): Promise<CreateTodoResponse> {
    const { title } = createTodoRequest;

    const todo: Todo = this.create({
      title,
      completed: false,
      user,
    });
    const savedTodo: Todo = await this.save(todo);

    const returnTodo: CreateTodoResponse = {
      title: savedTodo.title,
      completed: savedTodo.completed,
    };
    return returnTodo;
  }
  async changeTitle(changeTodo: Todo, changeTitleRequest: ChangeTitleDtoRequest): Promise<ChangeTitleDtoResponse> {
    changeTodo.title = changeTitleRequest.title;
    const newTodo = await changeTodo.save();

    const returnTodo: CreateTodoResponse = {
      title: newTodo.title,
      completed: newTodo.completed,
    };
    return returnTodo;
  }

  async changeCompletes(changeTodo: Todo): Promise<void> {
    if (changeTodo.completed) {
      changeTodo.completed = false;
    } else {
      changeTodo.completed = true;
    }
    await changeTodo.save();
  }

  async deleteTodo(changeTodo: Todo): Promise<void> {
    await this.delete(changeTodo.id);
  }
}
