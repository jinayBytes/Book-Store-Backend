import { CreateSellInput } from './create-sell.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSellInput extends PartialType(CreateSellInput) {
  @Field(() => Int)
  id: number;
}
