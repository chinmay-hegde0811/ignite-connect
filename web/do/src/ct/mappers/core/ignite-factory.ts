import { CreateOrder } from './ignite/CreateOrder';
import { CreatePayment } from './ignite/CreatePayment';
import { CreateTransaction } from './ignite/CreateTransaction';
import { GetCart } from './ignite/GetCart';
import { GetCartById } from './ignite/GetCartById';
import { GetCustomObjects } from './ignite/GetCustomObjects';
import { GetInventory } from './ignite/GetInventory';
import { GetMyCart } from './ignite/GetMyCart';
import { GetOrderById } from './ignite/GetOrderById';
import { GetPaymentById } from './ignite/GetPaymentById';
import { RecalculateCart } from './ignite/RecalculateCart';
import { UpdateCarts } from './ignite/UpdateCart';
import { UpdateOrders } from './ignite/UpdateOrder';
import { UpdatePayment } from './ignite/UpdatePayment';
import { ReplicateCart } from './ignite/ReplicateCart';
import { UpdateOrderPayment } from './ignite/UpdateOrderPayment';

export abstract class Ignite {
  public get getVariables() {
    return CreateOrder.getVariables;
  }

  public get createOrderResponseMapper() {
    return CreateOrder.createOrderResponseMapper;
  }

  public get createPaymentResponseMapper() {
    return CreatePayment.createPaymentResponseMapper;
  }

  public get createTransactionResponseMapper() {
    return CreateTransaction.createTransactionResponseMapper;
  }

  public get getCartResponseMapper() {
    return GetCart.getCartResponseMapper;
  }

  public get getCartByIdResponseMapper() {
    return GetCartById.getCartByIdResponseMapper;
  }

  public get getCustomObjectsResponseMapper() {
    return GetCustomObjects.getCustomObjectsResponseMapper;
  }

  public get getInventoryResponseMapper() {
    return GetInventory.getInventoryResponseMapper;
  }

  public get getMyCartResponseMapper() {
    return GetMyCart.getMyCartResponseMapper;
  }

  public get getOrderByIdResponseMapper() {
    return GetOrderById.getOrderByIdResponseMapper;
  }

  public get getPaymentByIdResponseMapper() {
    return GetPaymentById.getPaymentByIdResponseMapper;
  }

  public get recalculateCartResponseMapper() {
    return RecalculateCart.recalculateCartResponseMapper;
  }

  public get updateCartResponseMapper() {
    return UpdateCarts.updateCartResponseMapper;
  }

  public get updateOrderPaymentResponseMapper() {
    return UpdateOrders.updateOrderPaymentResponseMapper;
  }

  public get updatePaymentResponseMapper() {
    return UpdatePayment.updatePaymentResponseMapper;
  }

  public get replicateCartResponseMapper() {
    return ReplicateCart.replicateCartResponseMapper;
  }

  public get updateOrderAddPaymentResponseMapper() {
    return UpdateOrderPayment.updateOrderAddPaymentResponseMapper;
  }
}
