import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/modules/users/users.service";

type JwtAuthenticationPayload = {
    sub: string;
    email: string
    roles: string[]
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '08f97f637de4859c658268dffa6d563480379c82'
        })
    }

    async validate(payload: JwtAuthenticationPayload) {
        const user = await this.usersService.findOneOrFail(payload.sub)
        return { id: user.id, email: user.email, roles: JSON.parse(user.roles) }
    }
}