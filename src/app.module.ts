import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TodoModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'kakao' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
