import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TodoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
