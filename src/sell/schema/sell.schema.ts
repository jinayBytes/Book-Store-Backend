import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from 'src/book/schema/book.schema';
import { SellType } from 'src/helper/enum/sell_type.enum';
import { User } from 'src/user/schema/user.schema';

// registerEnumType(SellType)

@ObjectType()
export class order_Details {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  @Field()
  book: string;

  @Prop({ required: true, type: Number })
  @Field()
  quantity: number;

}

@Schema({ timestamps: true })
@ObjectType()
export class Sell extends Document {

  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Field()
  user: User;

  @Prop({ required: true, type: Number })
  @Field()
  price: number;

  @Prop({ required: true, type: Number })
  @Field()
  totalQuantity: number;

  @Prop({ required: true, enum: SellType })
  @Field()
  sellType: SellType;

  @Prop()
  @Field(() => [order_Details])
  order_details: order_Details[];
}




export const SellSchema = SchemaFactory.createForClass(Sell);