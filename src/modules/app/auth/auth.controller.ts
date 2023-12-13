import { RequestWithUser } from './auth.interface';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/app/auth/auth.service';
import { LocalAuthGuard } from 'src/modules/app/auth/guards/local.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user.mssv)
  }
}
