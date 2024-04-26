import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { log } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.input';
import { findAllUsersResponseDto } from './dto/find-all-users-reponse.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateReaderInput } from './dto/update-reader.input';
import nlp from 'compromise';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ){}
  async create(createUserInput: CreateUserInput): Promise<CreateUserResponseDto> {
    try {

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(createUserInput.password, salt);

      const userData = new this.userModel();

      userData.email = createUserInput.email;
      userData.name = createUserInput.name;
      userData.password = hashPassword;
      userData.favBooks = createUserInput.favBooks;
      
      userData.roles = createUserInput.roles;
      // const textt: string = createUserInput.favBooks;
      // console.log('898',textt);
      // const doc = nlp("textt");
      // console.log("doc");

      // const a = doc.verbs().toPastTense()
      // console.log("doc1121");
      // const b = doc.text()
      // console.log(a, ' ', b);
      // const nouns = doc.nouns().out('array');
      // const adjectives = doc.adjectives().out('array');

      // console.log(nouns);
      // console.log(adjectives);
      const user = await this.userModel.create(userData)
      console.log(user);
      return {
        status: true,
        statusCode: 201,
        message: 'User created successfully',
      }
    } catch (error) {
        console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUser: LoginUserDto): Promise<LoginResponseDto> {
    try {
      const userExist = await this.userModel.findOne({ email: loginUser.email });

      if (!userExist) {
        return {
          status: false,
          statusCode: 401,
          message: 'Incorrect Username and Password.',
        }
        // throw new UnauthorizedException("Incorrect Username and Password.");
      }

      const validPassword = await bcrypt.compare(loginUser.password, userExist.password);
      console.log(validPassword);
      if (!validPassword) {
          return {
            status: false,
            statusCode: 401,
            message: "Incorrect Username and Password.",
          }
          // throw new UnauthorizedException("Incorrect Username and Password.");
      }

      const payload = {
        name: userExist.name,
        favBooks: userExist.favBooks,
        email: userExist.email
      }
      
      const token = this.jwtService.sign(payload);

      return {
        status: true,
        statusCode: 200,
        message: 'User Login successfully',
        data: userExist,
        token
      }
      
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async findAll(context: any): Promise<findAllUsersResponseDto> {
    try {
      console.log('IN CONTEXT');
      console.log(context.req.user);
      const findAllUsers = await this.userModel.find().lean()
      // console.log(findAllUsers);
      return {
        status: true,
        statusCode: 200,
        message: 'All Users fetched successfully.',
        data: findAllUsers
      }
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(email: string): Promise<LoginResponseDto> {
    try {
      const findByIdUser = await this.userModel.findOne({ email }).exec()
     
      if(!findByIdUser) {
        throw new NotFoundException('User not found!!!');
      }
      return {
        status: true,
        statusCode: 200,
        message: 'User fetched successfully',
        data: findByIdUser
      }
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateReader(updateReaderInput: UpdateReaderInput): Promise<CreateUserResponseDto> {
    try {
      const { favBooks, name, email } = updateReaderInput;

      const updateReader = await this.userModel.findOneAndUpdate({ email }, { favBooks, name }, { new: true });

      if (!updateReader) {
        throw new NotFoundException(`Data with email ${email} not found`);
      }

      // console.log(updateReader);

      return {
        status: true,
        statusCode: 200,
        message: 'User updated successfully',
      }
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeReader(email: string): Promise<CreateUserResponseDto> {
    try {

      const removeReader = await this.userModel.deleteOne({ email });

      // console.log(removeReader);

      if (!removeReader.deletedCount) {
        throw new NotFoundException(`Data with email ${email} not found`); 
      }

      return {
        status: true,
        statusCode: 200,
        message: 'User removed successfully',
      }
    } catch (error) {
      console.log(error);
        throw new HttpException(
          error.message,
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
