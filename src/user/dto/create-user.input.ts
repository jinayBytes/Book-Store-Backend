import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/helper/enum/user.enum';

registerEnumType(Role,{
  name: "Role"
})

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field()
  favBooks: string;

  // @Field(() => [Role], { defaultValue: [Role.READER] })
  // roles: Role[];
  
  @Field(() => [Role])
  // @IsEnum(Role)
  roles: Role[];
}
