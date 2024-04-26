import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './schema/author.schema'
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { CreateUserResponseDto } from 'src/user/dto/create-user-response.dto';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => CreateUserResponseDto, { name: 'AuthorCreate' })
  async createAuthor(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput): Promise<CreateUserResponseDto>  {
    return await this.authorService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: 'FetchAllAuthor' })
  async findAll(): Promise<Author[]> {
    return await this.authorService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.findOne(id);
  }

  @Mutation(() => Author)
  updateAuthor(@Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput) {
    return this.authorService.update(updateAuthorInput.id, updateAuthorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.remove(id);
  }
}
