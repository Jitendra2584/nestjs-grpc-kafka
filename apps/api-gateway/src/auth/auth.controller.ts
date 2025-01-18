import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './gaurd/local.auth-guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './gaurd/jwt-refresh-auth-guard';
import { GithubAuthGuard } from './gaurd/github-auth-guard';
import { GoogleAuthGuard } from './gaurd/google-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(req.user, response);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Req() req, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(req.user, response);
  }

  @Get('github/login')
  @UseGuards(GithubAuthGuard)
  async githubLogin(): Promise<void> {
    // This route will redirect to GitHub's OAuth page
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('github login');
    // TODO  - Implement your own logic here of what to do after github login success
    // Redirect to the frontend or handle post-login logic
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(): Promise<void> {
    // This route redirects to Google's OAuth page
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: any) {
    // Handle successful authentication
    const user = req.user;
    console.log('Authenticated user:', user);

    // TODO  - Implement your own logic here of what to do after google login success

    // Redirect to your frontend or handle post-login logic
  }
}
