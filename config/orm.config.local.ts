import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TodoUser } from '../auth/todo-user.entity';
import { Todo } from '../todo/todo.entity';

export const dataSource = registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'tododb',
    entities: [Todo, TodoUser],
    migrations: ['src/db/migrations/*.ts'],
    synchronize: true,
    logging: true,
  }),
);
