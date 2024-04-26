// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

// @Injectable()
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {} // Inject Reflector

    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const { user } = ctx.getContext().req;

        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log("requiredRoles");
        console.log(requiredRoles);
        console.log("requiredRoles");
        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // No roles required, allow access
        }

        // console.log('IN ROLE GUARD');
        // console.log(user);
        // console.log(requiredRoles);
        // console.log(requiredRoles.some(role => user?.data?.roles?.includes(role)))
        const tmp = requiredRoles.some((role) => {
            // console.log(user.roles);
            return user?.data?.roles?.includes(role)
        })

        // console.log(tmp);
        return requiredRoles.some(role => user?.data?.roles?.includes(role));
    }
}