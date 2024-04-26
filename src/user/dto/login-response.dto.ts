import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../schema/user.schema';
import { CreateUserResponseDto } from './create-user-response.dto';
import { IsEmpty, IsOptional } from 'class-validator';

@ObjectType()
export class LoginResponseDto extends CreateUserResponseDto {

    @Field({nullable:true})
    data?: User | null;

    @Field({ nullable: true })
    token?: string;
}
