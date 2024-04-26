import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema({ timestamps:true })
@ObjectType()
export class Author extends Document {
    @Prop({ required: true })
    @Field()
    name: string;

    @Prop({ required: true, unique: true })
    @Field()
    email: string;

    @Prop()
    @Field()
    dateOfBirth: Date;

    @Prop()
    @Field()
    biography: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
