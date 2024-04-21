import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TodoRepository])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
