import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { BookGenre } from '../schema/book.schema';
import { Schema as MongooSchema } from 'mongoose';


@InputType()
export class PriceListt { 
  @Field({ nullable: true })
  mfgPrice: number

  @Field({ nullable: true })
  wlsPrice: number

  @Field({ nullable: true })
  rtlPrice: number
}

@InputType()
export class CreateBookInput {

  @Field()
  title: string;

  @Field()
  author: string;
  
  @Field({ description: 'The genre of the book. Allowed values: FICTION, NON_FICTION' })
  genre: BookGenre;

  @Field()
  publicationDate: Date;

  @Field()
  isbn: string;

  @Field()
  description: string;

  @Field(() => PriceListt)
  priceDetails: PriceListt;

  @Field()
  quantity: number;
}
