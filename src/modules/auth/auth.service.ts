import { Injectable } from '@nestjs/common';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(user: User) {
        // Sub é o alias do id
        const payload = { sub: user.id, email: user.email, roles: JSON.parse(user.roles) }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        let user: User
        try {
            user = await this.userService.findByEmailOrFail(email)
        } catch {
            return null
        }

        const isPasswordValid = compareSync(password, user.password)
        if (!isPasswordValid) return null
        return user
    }
}
