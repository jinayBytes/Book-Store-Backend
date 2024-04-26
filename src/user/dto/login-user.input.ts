import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginUserDto {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
