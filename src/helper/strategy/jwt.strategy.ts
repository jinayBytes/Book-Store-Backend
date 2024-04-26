import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SecurityCheck121',
        });
    }

    async validate(payload: any): Promise<any> {
        const { email } = payload;

        // console.log(email);
        const getUser = await this.userService.findOne(email);
        if (!getUser) {
            throw new UnauthorizedException();
        }
        // console.log(getUser);
        return getUser;
        // const user = await this.userService.findOne()
    }

}