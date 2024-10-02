import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuardJwt } from '../auth/guards/auth-guard.jwt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @Patch('/profile/:id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateProfile(
    @Param(':id') id: string,
    @Body() updateUserData: UpdateUserDTO,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new BadRequestException(`No user found for id ${id}`);
    }

    return this.userService.updateUser(user, updateUserData);
  }

  @Patch('/update-password/:id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Param('id') id: string, @Body() password: string) {
    return await this.userService.changePassword(id, password);
  }
}
