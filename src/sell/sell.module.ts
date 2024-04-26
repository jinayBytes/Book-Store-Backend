import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellResolver } from './sell.resolver';
import { Sell, SellSchema } from './schema/sell.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Book, BookSchema } from 'src/book/schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sell.name, schema: SellSchema }, { name:User.name, schema: UserSchema }, { name: Book.name, schema: BookSchema }])
  ],
  providers: [SellResolver, SellService],
  exports: [SellService]
})
export class SellModule {}
