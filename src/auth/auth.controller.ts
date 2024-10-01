import { Controller, Post, SerializeOptions, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { AuthGuardLocal } from './guards/auth-guard.local';
import { TodoUser } from './todo-user.entity';

@Controller('auth')
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: TodoUser) {
    return {
      id: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }
}
