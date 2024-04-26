import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {

  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    try {
      const bookDetails = new this.bookModel(createBookInput);
      return await bookDetails.save();
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // return 'This action adds a new book';
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.bookModel.find().populate('author').exec();
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
