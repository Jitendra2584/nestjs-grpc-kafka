import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ICreateOrderRequestDto,
  IListOrdersRequestDto,
  IUpdateOrderRequestDto,
  ORDER_SERVICE_NAME,
  OrderServiceClient,
  PaginationDto,
} from 'libs/src';
import { ORDER_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class OrdersService implements OnModuleInit {
  private orderService: OrderServiceClient;
  constructor(@Inject(ORDER_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService =
      this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }
  create(createOrderDto: ICreateOrderRequestDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  listOrder(getListOrderDto: IListOrdersRequestDto) {
    return this.orderService.listOrders(getListOrderDto);
  }

  findOne(id: string) {
    return this.orderService.getOrder({ id });
  }

  update(
    id: string,
    updateOrderDto: Pick<
      IUpdateOrderRequestDto,
      'customerId' | 'items' | 'totalPrice'
    >,
  ) {
    return this.orderService.updateOrder({ id, ...updateOrderDto });
  }

  remove(id: string) {
    return this.orderService.deleteOrder({ id });
  }

  async allOrders() {
    const orders$ = new ReplaySubject<PaginationDto>();

    orders$.next({ pageNumber: 0, pageSize: 10 });
    orders$.next({ pageNumber: 1, pageSize: 10 });
    orders$.next({ pageNumber: 2, pageSize: 10 });
    orders$.next({ pageNumber: 3, pageSize: 10 });
    orders$.next({ pageNumber: 4, pageSize: 10 });
    let chunkNumber = 1;

    orders$.complete();
    this.orderService.queryOrders(orders$).subscribe((response) => {
      console.log(`Chunk ${chunkNumber}:`, response);
      chunkNumber += 1;
    });
  }
}
