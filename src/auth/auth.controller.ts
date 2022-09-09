import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { ApiBody } from '@nestjs/swagger';
import { Roles } from './roleBasedAuth/roles.decorator';
import { Role } from './roleBasedAuth/role.enum';
import { RolesGuard } from './roleBasedAuth/roles.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: Auth })
  @Post('auth/login')
  //@Roles(Role.Admin)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  @Roles(Role.Admin)
  getProfile(@Request() req) {
    return req.user;
  }
}
