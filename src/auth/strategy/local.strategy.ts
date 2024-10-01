import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { TodoUser } from '../todo-user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectRepository(TodoUser)
    private readonly userRepository: Repository<TodoUser>,
  ) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (!user) {
      this.logger.debug(`User ${user} not found`);
      throw new UnauthorizedException();
    }

    const samePass = await bcrypt.compare(password, user.password);

    if (!samePass) {
      this.logger.debug(`Password for ${user} doesnt match`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
