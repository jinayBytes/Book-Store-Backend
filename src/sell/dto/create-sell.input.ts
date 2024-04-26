import { InputType, Int, Field, ID, registerEnumType, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/schema/book.schema';
import { SellType } from 'src/helper/enum/sell_type.enum';
// import { orderDetails } from '../schema/sell.schema';

registerEnumType(SellType,{
  name: "SellType"
})

@InputType()
export class order_Detail { 
  @Field()
  book: string;

  @Field()
  quantity: number;

}


@InputType()
export class CreateSellInput {
  @Field()
  description: string;

  @Field(() => String)
  user: string;

  @Field(() => SellType)
  sellType: SellType;

  @Field(() => [order_Detail])
  order_details: order_Detail[];
}