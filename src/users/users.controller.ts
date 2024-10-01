import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard.jwt';
import { TodoUser } from 'src/auth/todo-user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('/user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(TodoUser)
    private readonly userRepository: Repository<TodoUser>,
  ) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    const user = new TodoUser();

    let existingUser: TodoUser | null;

    try {
      existingUser = await this.userRepository.findOne({
        where: [
          { username: createUserDTO.username },
          { email: createUserDTO.email },
        ],
      });
    } catch (error: any) {
      throw new Error(error);
    }

    if (existingUser?.username === createUserDTO.username) {
      throw new BadRequestException(['username already taken']);
    }

    if (existingUser?.email === createUserDTO.email) {
      throw new BadRequestException([
        'email already in user, did you forgot your password?',
      ]);
    }

    const {
      birthdate,
      email,
      lastName,
      name,
      password,
      username,
      profilePicture,
    } = createUserDTO;

    user.birthdate = birthdate;
    user.email = email;
    user.lastName = lastName;
    user.name = name;
    user.password = await this.authService.hashPassword(password);
    user.username = username;
    user.profilePicture = profilePicture ?? '';

    user.save();

    return !!existingUser;
  }

  @Get('/profile')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: TodoUser) {
    return user;
  }
}
