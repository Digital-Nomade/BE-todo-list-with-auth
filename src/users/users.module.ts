import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { TodoUser } from 'src/auth/todo-user.entity';
import { UserController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoUser])],
  controllers: [UserController],
  providers: [AuthService, JwtService],
})
export class UserModule {}
