import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/helper/enum/user.enum';

@InputType()
export class UpdateReaderInput {
  @IsEmail()
  @Field()
  email: string;
  
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  favBooks: string;

  // @Field(() => [Role])
  // roles: Role[];

  @Field(() => [String])
  @IsEnum(Role)
  roles: Role[];

}
