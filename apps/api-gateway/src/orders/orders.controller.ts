import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ICreateOrderRequestDto,
  IListOrdersRequestDto,
  IUpdateOrderRequestDto,
} from 'libs/src';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: ICreateOrderRequestDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  listOrder(@Body() getListOrderDto: IListOrdersRequestDto) {
    return this.ordersService.listOrder(getListOrderDto);
  }

  @Get(':id')
  findOneOrder(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  updateOrder(
    @Param('id') id: string,
    @Body()
    updateOrderDto: Pick<
      IUpdateOrderRequestDto,
      'customerId' | 'items' | 'totalPrice'
    >,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  removeOrder(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Post('all')
  async allOrders() {
    return await this.ordersService.allOrders();
  }
}
