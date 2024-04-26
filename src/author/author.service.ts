import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { CreateUserResponseDto } from 'src/user/dto/create-user-response.dto';
import { Author } from './schema/author.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}
  async create(createAuthorInput: CreateAuthorInput): Promise<CreateUserResponseDto> {
    try {

      const insertAuthor = new this.authorModel(createAuthorInput);
      const authorsaved = await insertAuthor.save();
      // console.log(authorsaved);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Author created successfully',
      }
      
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Author[]> {
    try {
      const getAllAuthors = await this.authorModel.find();
      // console.log(getAllAuthors);
      return getAllAuthors;
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
