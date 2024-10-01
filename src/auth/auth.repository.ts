import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly authService: AuthService) {}
}
