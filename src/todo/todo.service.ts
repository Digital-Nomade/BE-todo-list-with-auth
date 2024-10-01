import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TodoUser } from '../auth/todo-user.entity';
import { CreateTodo } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  private getTodoBaseQuery(): SelectQueryBuilder<Todo> {
    return this.todoRepository
      .createQueryBuilder('todo')
      .orderBy('todo.createdAt');
  }

  public async createTodo(data: CreateTodo, user: TodoUser): Promise<Todo> {
    const todo = new Todo({ ...data, user });
    return await this.todoRepository.save(todo);
  }
}
