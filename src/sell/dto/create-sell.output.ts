import { Field, ObjectType } from '@nestjs/graphql';
import { Sell } from '../schema/sell.schema';
import { CreateUserResponseDto } from 'src/user/dto/create-user-response.dto';

@ObjectType()
export class CreateSellResponseDto extends CreateUserResponseDto {

    @Field({nullable:true})
    data?: Sell | null;

    @Field({ nullable: true })
    token?: string;
}
