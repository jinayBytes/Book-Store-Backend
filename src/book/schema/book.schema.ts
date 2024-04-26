import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { Author } from "src/author/schema/author.schema";
import { Schema as MongooSchema } from 'mongoose';

export enum BookGenre {
    FICTION = 'FICTION',
    NON_FICTION = 'NON_FICTION',
    MYSTERY = 'MYSTERY',
    SCIENCE_FICTION = 'SCIENCE_FICTION',
    // Add more genres as needed
  }

// interface PriceDetails {
//     mfgPrice: number;
//     wlsPrice: number;
//     rtlPrice: number;
//     // Add any other fields you want to include in userDetails
// }

@ObjectType()
export class PriceList { 
    @Field({ nullable: true })
    mfgPrice: number
  
    @Field({ nullable: true })
    wlsPrice: number
  
    @Field({ nullable: true })
    rtlPrice: number
  }
  

@Schema({ timestamps: true })
@ObjectType()
export class Book extends Document {
    
    @Field(() => ID)
    _id: string;

    @Prop({ required: true })
    @Field()
    title: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
    @Field()
    author: Author; // Replace 'Author' with your actual Author model

    @Prop({ required: true, enum: BookGenre }) // Using enum here
    @Field()
    genre: BookGenre;

    @Prop()
    @Field()
    publicationDate: Date;

    @Prop()
    @Field()
    isbn: string;

    @Prop()
    @Field()
    description: string;

    @Prop({ type: Object })
    @Field(()=> PriceList)
    priceDetails: PriceList;

    @Prop({ required: true, type: Number })
    @Field()
    quantity: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);