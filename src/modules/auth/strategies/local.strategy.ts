import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { MessagesHelper } from "src/helpers/messages";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        // A estratégia local sempre usa username. Aqui trocamos para email
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password)
        if(!user) throw new UnauthorizedException(MessagesHelper.INVALID_EMAIL_OR_PASSWORD)
        return user
    }
}