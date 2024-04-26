import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import mongoose, { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/helper/strategy/jwt.strategy';
import { RolesGuard } from 'src/helper/strategy/role.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SecurityCheck121',
    }),
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]
  )],
  providers: [UserResolver, UserService, JwtStrategy, RolesGuard],
  exports: [UserService]
})
export class UserModule {}
