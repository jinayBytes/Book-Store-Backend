import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SellService } from './sell.service';
import { Sell } from './schema/sell.schema';
import { CreateSellInput } from './dto/create-sell.input';
import { UpdateSellInput } from './dto/update-sell.input';

@Resolver(() => Sell)
export class SellResolver {
  constructor(private readonly sellService: SellService) {}

  @Mutation(() => Sell, { name: 'InsertSell' })
  async createSell(@Args('createSellInput') createSellInput: CreateSellInput): Promise<any> {
    return await this.sellService.create(createSellInput);
  }

  @Query(() => [Sell], { name: 'sell' })
  findAll() {
    return this.sellService.findAll();
  }

  @Query(() => Sell, { name: 'sell' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellService.findOne(id);
  }

  @Mutation(() => Sell)
  updateSell(@Args('updateSellInput') updateSellInput: UpdateSellInput) {
    return this.sellService.update(updateSellInput.id, updateSellInput);
  }

  @Mutation(() => Sell)
  removeSell(@Args('id', { type: () => Int }) id: number) {
    return this.sellService.remove(id);
  }
}
