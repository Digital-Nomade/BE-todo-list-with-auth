import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTodo } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() body: CreateTodo) {
    // const res = await this.todoService.createTodo(body, {});
    return `created todo with body ${JSON.stringify(body)}`;
  }

  @Get()
  findAll() {
    return 'all todos';
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findById(@Param('id', ParseIntPipe) id: number) {
    return `todo with id ${id}`;
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id', ParseIntPipe) id: number) {
    return `the todo with id ${id} is updated`;
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  delete(@Param('id', ParseIntPipe) id: number) {
    return `the todo with id ${id} is deleted`;
  }
}
