import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from '../todo/todo.entity';

@Entity()
export class TodoUser extends BaseEntity {
  constructor(partial?: Partial<TodoUser>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ nullable: false })
  @Expose()
  name: string;

  @Column()
  @Expose()
  lastName: string;

  @Column({ unique: true, nullable: false })
  @Expose()
  username: string;

  @Column({ unique: true, nullable: false })
  @Expose()
  email: string;

  @Column({ type: 'date' })
  @Expose()
  birthdate: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Expose()
  profilePicture: string;

  @CreateDateColumn()
  @Expose()
  createdAt: Date;

  @CreateDateColumn()
  @Expose()
  updatedAt: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  @Expose()
  todos: Event[];

  // @Column({ default: false })
  // @Expose()
  // isVerified: boolean;

  // @Column({ type: 'uuid' })
  // forgotPasswordToken: string;

  // @Column({ type: 'uuid' })
  // confirmSubscription: string;
}
