import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TodoUser } from './todo-user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  public getTokenForUser(user: TodoUser): string {
    this.logger.debug(JSON.stringify(user));
    return this.jwtService.sign(
      {
        username: user.username,
        sub: user.id,
      },
      { secret: process.env.AUTH_SECRET },
    );
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 15);
  }
}
