import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TodoUser } from '../auth/todo-user.entity';
import {
  paginate,
  PaginateOptions,
  PaginationResult,
} from '../pagination/paginator';
import { CreateTodo } from './dto/create-todo.dto';
import { UpdateTodo } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

type OrderBy = 'DESC' | 'ASC';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  public async createTodo(data: CreateTodo, user: TodoUser): Promise<Todo> {
    const todo = new Todo({ ...data, user });
    return await this.todoRepository.save(todo);
  }

  public async updateTodo(todo: Todo, data: UpdateTodo): Promise<Todo> {
    return await this.todoRepository.save(new Todo({ ...todo, ...data }));
  }

  public async deleteTodo(id: string): Promise<DeleteResult> {
    return await this.todoRepository
      .createQueryBuilder('todo')
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  public async findAllPaginated(
    userId: string,
    orderBy: OrderBy = 'DESC',
    paginationOptions?: PaginateOptions,
  ): Promise<PaginationResult<Todo>> {
    const query = await this.todoRepository
      .createQueryBuilder('todo')
      .setFindOptions({ where: { user: { id: userId } } })
      .orderBy('todo.createdAt', orderBy);

    return paginate<Todo>(query, paginationOptions);
  }

  public async findOne(id: string, user: TodoUser): Promise<Todo | null> {
    return await this.todoRepository.findOne({
      where: { id: id, user: { id: user.id } },
    });
  }
}
