// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               v3.12.4
// source: proto/orders.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'order';

/** Order Message */
export interface IOrder {
  /** Unique identifier for the order */
  id: string;
  /** Customer's unique ID */
  customerId: string;
  /** List of items in the order */
  items: string[];
  /** Total price of the order */
  totalPrice: number;
}

/** Create Order DTO */
export interface ICreateOrderRequestDto {
  /** Customer's unique ID */
  customerId: string;
  /** List of items for the order */
  items: string[];
  /** Total price for the order */
  totalPrice: number;
}

/** Update Order DTO */
export interface IUpdateOrderRequestDto {
  /** ID of the order to update */
  id: string;
  /** Updated customer ID (if applicable) */
  customerId: string;
  /** Updated list of items */
  items: string[];
  /** Updated total price */
  totalPrice: number;
}

/** Get Order Request (for fetching by ID) */
export interface IGetOrderRequestDto {
  /** The ID of the order to fetch */
  id: string;
}

/** List Orders Request (Optional, used for fetching all orders) */
export interface IListOrdersRequestDto {
  /** Customer ID to filter orders (optional) */
  customerId: string;
}

/** Delete Order Request (for deleting by ID) */
export interface IDeleteOrderRequestDto {
  /** The ID of the order to delete */
  id: string;
}

export interface PaginationDto {
  pageNumber: number;
  pageSize: number;
}

/** Response for List Orders */
export interface IListOrdersResponse {
  /** List of orders */
  orders: IOrder[];
}

/** Response for Delete Order */
export interface IDeleteOrderResponse {
  /** True if the deletion was successful */
  success: boolean;
}

export const ORDER_PACKAGE_NAME = 'order';

/** Service Definition for Order Service */

export interface OrderServiceClient {
  /** Create a new order */

  createOrder(request: ICreateOrderRequestDto): Observable<IOrder>;

  /** Update an existing order */

  updateOrder(request: IUpdateOrderRequestDto): Observable<IOrder>;

  /** Get an order by ID */

  getOrder(request: IGetOrderRequestDto): Observable<IOrder>;

  /** List all orders (or filter by customer ID) */

  listOrders(request: IListOrdersRequestDto): Observable<IListOrdersResponse>;

  /** Delete an order by ID */

  deleteOrder(
    request: IDeleteOrderRequestDto,
  ): Observable<IDeleteOrderResponse>;

  /** Stream orders with pagination */

  queryOrders(
    request: Observable<PaginationDto>,
  ): Observable<IListOrdersResponse>;
}

/** Service Definition for Order Service */

export interface OrderServiceController {
  /** Create a new order */

  createOrder(
    request: ICreateOrderRequestDto,
  ): Promise<IOrder> | Observable<IOrder> | IOrder;

  /** Update an existing order */

  updateOrder(
    request: IUpdateOrderRequestDto,
  ): Promise<IOrder> | Observable<IOrder> | IOrder;

  /** Get an order by ID */

  getOrder(
    request: IGetOrderRequestDto,
  ): Promise<IOrder> | Observable<IOrder> | IOrder;

  /** List all orders (or filter by customer ID) */

  listOrders(
    request: IListOrdersRequestDto,
  ):
    | Promise<IListOrdersResponse>
    | Observable<IListOrdersResponse>
    | IListOrdersResponse;

  /** Delete an order by ID */

  deleteOrder(
    request: IDeleteOrderRequestDto,
  ):
    | Promise<IDeleteOrderResponse>
    | Observable<IDeleteOrderResponse>
    | IDeleteOrderResponse;

  /** Stream orders with pagination */

  queryOrders(
    request: Observable<PaginationDto>,
  ): Observable<IListOrdersResponse>;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createOrder',
      'updateOrder',
      'getOrder',
      'listOrders',
      'deleteOrder',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('OrderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = ['queryOrders'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('OrderService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ORDER_SERVICE_NAME = 'OrderService';
