import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Autenticação') // Define a categoria no Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Faz login e retorna o token JWT' }) // Descrição do endpoint
  @ApiResponse({ status: 201, description: 'Login bem-sucedido. Retorna o token JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @ApiBody({ 
    schema: { 
      example: { 
        email: 'alan@bianchi.com', 
        senha: '12345' 
      } 
    }
  })
  async login(@Body() data: any) {
    const user = await this.authService.validateUser(data.email, data.senha);
    return this.authService.login(user);
  }
}
