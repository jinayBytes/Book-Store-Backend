import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schema/user.schema';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-user.input';
import { findAllUsersResponseDto } from './dto/find-all-users-reponse.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/helper/strategy/jwt.guard';
import { UpdateReaderInput } from './dto/update-reader.input';
import { RolesGuard } from 'src/helper/strategy/role.guard';
import { Roles } from 'src/helper/strategy/role.decorator';
import { Role } from 'src/helper/enum/user.enum';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => CreateUserResponseDto,{name:'createUser'})
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<CreateUserResponseDto> {
    console.log(createUserInput);
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => LoginResponseDto, { name: 'loginUser' })
  async loginUser(@Args('loginUserInput') loginUser: LoginUserDto): Promise<LoginResponseDto> {
    return await this.userService.login(loginUser)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)

    // @UseGuards(AuthGuard('jwt'))
  @Query(() => findAllUsersResponseDto, { name: 'FindAllUsers' })
  // @Roles(Role.VISITOR, Role.ADMIN)
  async findAll(@Context() context) {
    return await this.userService.findAll(context);
  }

  @Query(() => LoginResponseDto, { name: 'findOneUser' })
  async findOne(@Args('email', { type: () => String }) email: string): Promise<LoginResponseDto> {
    return await this.userService.findOne(email);
  }

  @Mutation(() => CreateUserResponseDto, { name: 'UpdateReader' })
  async updateUser(@Args('updateReaderInput') updateReaderInput: UpdateReaderInput) {
    return await this.userService.updateReader(updateReaderInput);
  }

  @Mutation(() => CreateUserResponseDto, { name: 'DeleteReader' })
  async removeReader(@Args('email', { type: () => String }) email: string) {
    return await this.userService.removeReader(email);
  }
}
