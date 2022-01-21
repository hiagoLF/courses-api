import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/users.model';
import { AuthService } from './auth.service';

type LoginRequest = {
    user: User
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: LoginRequest) {
        return this.authService.login(req.user)
    }
}
