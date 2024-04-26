import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Role } from 'src/helper/enum/user.enum';

// export type UserDocument = User & Document;
@Schema({timestamps:true})
@ObjectType()
export class User extends Document{

   // Add user properties
   @Field(() => String)
   @Prop()
   name: string;

   @Field(() => String)
   @Prop({ unique: true })
   email: string;

   @Field(() => String)
   @Prop()
   password: string;

   @Field(() => String)
   @Prop()
   favBooks: string;

   // @Prop({ type: [{ type: String, enum: Role }], default: [Role.READER] })
   // @Field(() => [Role]) 
   // roles: Role[];

   @Field(() => [String])
   @Prop({ type: [{ type: String, enum: Object.values(Role) }] })
   roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);