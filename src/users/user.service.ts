import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { TodoUser } from 'src/auth/todo-user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(TodoUser)
    private readonly userRepository: Repository<TodoUser>,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
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

  async updateUser(user: TodoUser, chunck: UpdateUserDTO) {
    return await this.userRepository.save(new TodoUser({ ...user, ...chunck }));
  }

  async findOne(id: string): Promise<TodoUser | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async changePassword(
    userId: string,
    newPassword: string,
  ): Promise<TodoUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException(`No user found`);
    }

    const password = await this.authService.hashPassword(newPassword);

    return this.userRepository.save(
      new TodoUser({ ...user, password: password }),
    );
  }
}
