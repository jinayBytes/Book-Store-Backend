import { InputType, Int, Field } from '@nestjs/graphql';
// import { Author } from '../schema/author.schema';
import { IsDate, IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsDate()
  @Field()
  dateOfBirth: Date;

  @IsString()
  @Field()
  biography: string;

}
