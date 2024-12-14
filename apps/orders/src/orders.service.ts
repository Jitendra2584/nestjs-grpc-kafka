import {
  ICreateOrderRequestDto,
  IDeleteOrderRequestDto,
  IDeleteOrderResponse,
  IGetOrderRequestDto,
  IListOrdersRequestDto,
  IListOrdersResponse,
  IOrder,
  IUpdateOrderRequestDto,
  PaginationDto,
} from '@libs-common';
import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly orders: IOrder[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.orders.push({
        id: randomUUID(),
        customerId: `customer-${i}`,
        items: [`item-${i}`],
        totalPrice: i * 10,
      });
    }
  }

  onModuleInit() {
    console.log('OrdersService has been initialized.');
  }
  createOrder(createOrderDto: ICreateOrderRequestDto): IOrder {
    const order: IOrder = {
      id: randomUUID(),
      ...createOrderDto,
    };
    this.orders.push(order);
    return order;
  }

  getOrder(getOrderDto: IGetOrderRequestDto): IOrder {
    return this.orders.find((order) => order.id === getOrderDto.id);
  }

  updateOrder(updateOrderDto: IUpdateOrderRequestDto): IOrder {
    const orderNumber = this.orders.findIndex(
      (order) => order.id === updateOrderDto.id,
    );

    if (orderNumber !== -1) {
      this.orders[orderNumber] = {
        ...this.orders[orderNumber],
        ...updateOrderDto,
      };
      return this.orders[orderNumber];
    }

    throw new RpcException({
      code: HttpStatus.NOT_FOUND,
      message: 'Order not found',
    });
  }

  listOrders(listOrdersDto: IListOrdersRequestDto): IListOrdersResponse {
    return {
      orders: this.orders.filter(
        (order) => order.customerId === listOrdersDto.customerId,
      ),
    };
  }

  deleteOrder(deleteOrderDto: IDeleteOrderRequestDto): IDeleteOrderResponse {
    const orderNumber = this.orders.findIndex(
      (order) => order.id === deleteOrderDto.id,
    );

    if (orderNumber !== -1) {
      this.orders.splice(orderNumber, 1);
      return {
        success: true,
      };
    }

    throw new RpcException({
      code: HttpStatus.NOT_FOUND,
      message: 'Order not found',
    });
  }

  queryOrders(paginationDtoStream: Observable<PaginationDto>) {
    const subject = new Subject<IListOrdersResponse>();

    const onNext = (pagination: PaginationDto) => {
      const start = pagination.pageNumber * pagination.pageSize;
      subject.next({
        orders: this.orders.slice(start, start + pagination.pageSize),
      });
    };

    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({ next: onNext, complete: onComplete });

    return subject.asObservable();
  }
}
