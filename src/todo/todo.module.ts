import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoUser } from 'src/auth/todo-user.entity';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoUser])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
