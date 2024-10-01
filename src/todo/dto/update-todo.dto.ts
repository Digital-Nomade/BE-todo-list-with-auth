import { PartialType } from '@nestjs/mapped-types';
import { CreateTodo } from './create-todo.dto';

export class UpdateTodo extends PartialType(CreateTodo) {
  done?: boolean;
}
