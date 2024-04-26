import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellInput } from './dto/create-sell.input';
import { UpdateSellInput } from './dto/update-sell.input';
import { Sell } from './schema/sell.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Book } from 'src/book/schema/book.schema';
import { SellType } from 'src/helper/enum/sell_type.enum';

@Injectable()
export class SellService {
  constructor(
    @InjectModel(Sell.name) private readonly sellModel: Model<Sell>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createSellInput: CreateSellInput): Promise<any> {
    try {
      console.log('IN SELL');
      console.log(createSellInput); 
      const { description, order_details, sellType } = createSellInput;
      let total_price = 0, total_quanitity = 0, price_per_quantity = 0;
      const getUser = await this.userModel.findById(createSellInput.user);
      console.log(getUser);

      if (!getUser) {
        throw new NotFoundException('User not found!!!');
      }

      if (order_details.length) {
        for await (const book of order_details) {
          const getBook = await this.bookModel.findById(book.book);
          if (!getBook) {
            throw new NotFoundException('Book not found!!!');
          }

          switch(sellType) {
            case SellType.RETAIL:
              price_per_quantity = price_per_quantity + getBook.priceDetails.rtlPrice;
              break;

            case SellType.WHOLSESALE:
              price_per_quantity = price_per_quantity + getBook.priceDetails.wlsPrice;
              break;
          }
          
          if (book.quantity > getBook.quantity) {
            throw new NotFoundException('Book quantity is over, Add new book!');
          }

          total_quanitity = total_quanitity + book.quantity;
          total_price = total_quanitity * price_per_quantity;

          await this.bookModel.findByIdAndUpdate(book.book, { $inc: { quantity: -book.quantity } })
          
          console.log(getBook);
        }
      } 

      const sellObject = new this.sellModel();

      sellObject.description = description;
      sellObject.user = getUser;
      sellObject.price = total_price;
      sellObject.totalQuantity = total_quanitity;
      sellObject.sellType = sellType;
      sellObject.order_details = order_details;

      return await sellObject.save();

      // return createSellInput;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
    }
    // return 'This action adds a new sell';
  }

  findAll() {
    return `This action returns all sell`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sell`;
  }

  update(id: number, updateSellInput: UpdateSellInput) {
    return `This action updates a #${id} sell`;
  }

  remove(id: number) {
    return `This action removes a #${id} sell`;
  }
}
