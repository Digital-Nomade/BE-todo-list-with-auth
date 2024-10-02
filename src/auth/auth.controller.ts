import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { AuthGuardJwt } from './guards/auth-guard.jwt';
import { AuthGuardLocal } from './guards/auth-guard.local';
import { TodoUser } from './todo-user.entity';

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: TodoUser) {
    return {
      id: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('/profile')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: TodoUser) {
    this.logger.debug(`${JSON.stringify(user)}`);

    return user;
  }

  //TODO: Add routes to forgot password and account confirmation
}
