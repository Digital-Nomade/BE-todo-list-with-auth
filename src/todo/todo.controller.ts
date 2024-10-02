import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { TodoUser } from 'src/auth/todo-user.entity';
import { CreateTodo } from './dto/create-todo.dto';
import { UpdateTodo } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  async create(@Body() body: CreateTodo, @CurrentUser() user: TodoUser) {
    const res = await this.todoService.createTodo(body, user);
    return res;
  }

  @Get()
  @UseGuards(AuthGuardJwt)
  async findAll(@CurrentUser() user: TodoUser) {
    return await this.todoService.findAllPaginated(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  findById(@Param('id') id: string, @CurrentUser() user: TodoUser) {
    return this.todoService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() chunk: UpdateTodo,
    @CurrentUser() user: TodoUser,
  ) {
    const todo = await this.todoService.findOne(id, user);

    if (!todo) {
      throw new BadRequestException(
        `No Todo Item related to the following ID: ${id}`,
      );
    }

    return await this.todoService.updateTodo(todo, chunk);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(@Param('id') id: string) {
    return await this.todoService.deleteTodo(id);
  }
}
