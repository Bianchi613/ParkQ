import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: any) {
    const user = await this.authService.validateUser(data.email, data.senha);
    return this.authService.login(user);
  }
}
