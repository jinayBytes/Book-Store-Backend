import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './schema/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Author.name, schema: AuthorSchema}])
  ],
  providers: [AuthorResolver, AuthorService]
})
export class AuthorModule {}
