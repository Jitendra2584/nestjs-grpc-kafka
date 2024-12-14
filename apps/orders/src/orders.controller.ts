import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ICreateOrderRequestDto,
  IDeleteOrderRequestDto,
  IGetOrderRequestDto,
  IListOrdersRequestDto,
  IListOrdersResponse,
  IUpdateOrderRequestDto,
  OrderServiceController,
  OrderServiceControllerMethods,
  PaginationDto,
} from '@libs-common';
import { Observable } from 'rxjs';

@Controller()
@OrderServiceControllerMethods()
export class OrdersController implements OrderServiceController {
  constructor(private readonly ordersService: OrdersService) {}

  createOrder(createOrderDto: ICreateOrderRequestDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  getOrder(getOrderDto: IGetOrderRequestDto) {
    return this.ordersService.getOrder(getOrderDto);
  }

  updateOrder(updateOrderDto: IUpdateOrderRequestDto) {
    return this.ordersService.updateOrder(updateOrderDto);
  }

  listOrders(listOrdersDto: IListOrdersRequestDto) {
    return this.ordersService.listOrders(listOrdersDto);
  }

  deleteOrder(deleteOrderDto: IDeleteOrderRequestDto) {
    return this.ordersService.deleteOrder(deleteOrderDto);
  }

  queryOrders(
    paginationDto: Observable<PaginationDto>,
  ): Observable<IListOrdersResponse> {
    return this.ordersService.queryOrders(paginationDto);
  }
}
