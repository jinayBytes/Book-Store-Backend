import { Field, ObjectType } from "@nestjs/graphql";
import { CreateUserResponseDto } from "./create-user-response.dto";
import { User } from "../schema/user.schema";

@ObjectType()
export class findAllUsersResponseDto extends CreateUserResponseDto {
    @Field(() => [User], { nullable: true })
    data?: User[];
}