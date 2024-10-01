import { PaginationResult } from 'src/utils/paginator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoUser } from '../auth/todo-user.entity';

@Entity()
export class Todo extends BaseEntity {
  constructor(partial?: Partial<Todo>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  done: boolean;

  @Column({ type: 'date', nullable: true })
  dueTo: Date;

  @Column({ type: 'date', nullable: true })
  reminderOn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TodoUser, (users) => users.todos)
  user: TodoUser;
}

export type PaginatedTodos = PaginationResult<Todo>;
