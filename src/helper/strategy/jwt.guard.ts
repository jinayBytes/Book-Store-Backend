import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        try {
            const ctx = GqlExecutionContext.create(context);
        console.log('here here')
        // console.log(ctx.getContext().req);
        return ctx.getContext().req;

        } catch (error) {
            console.log('ERROR')
            console.log(error);
        }
    }
}
