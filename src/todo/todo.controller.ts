import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { CreateTodoRequest } from './dto/create-todo-req.dto';
import { CreateTodoResponse } from './dto/create-todo-res.dto';
import { ChangeTitleDtoRequest } from './dto/change-title-req.dto';
import { ChangeTitleDtoResponse } from './dto/change-title-res.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('todo') //localhost:3000/todo
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private todoService: TodoService) {} // 의존성 주입

  @Get()
  getAllTodo(@GetUser() user: User): Promise<Todo[]> {
    return this.todoService.getAllTodo(user);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: number, @GetUser() user: User): Promise<Todo> {
    return this.todoService.getTodoById(id, user);
  }

  @Post()
  createTodo(@Body() createTodoRequest: CreateTodoRequest, @GetUser() user: User): Promise<CreateTodoResponse> {
    return this.todoService.createTodo(createTodoRequest, user);
  }

  @Patch('/:id')
  changeTodoTitle(
    @Param('id') id: number,
    @Body() changeTitleRequest: ChangeTitleDtoRequest,
    @GetUser() user: User,
  ): Promise<ChangeTitleDtoResponse> {
    return this.todoService.changeTitle(id, changeTitleRequest, user);
  }

  @Patch('/:id/completes')
  changeCompletes(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.todoService.changeCompletes(id, user);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.todoService.deleteTodo(id, user);
  }
}
