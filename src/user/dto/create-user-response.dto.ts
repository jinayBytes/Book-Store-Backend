import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { User } from '../schema/user.schema';

@ObjectType()
export class CreateUserResponseDto {
  @IsBoolean()
  @Field()
  status: boolean;

  @IsNumber()
  @Field()
  statusCode: number;

  @IsString()
  @Field()
  message: string;
}
