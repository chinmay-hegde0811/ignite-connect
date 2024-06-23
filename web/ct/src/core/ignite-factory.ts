import { Cache } from './ignite/cache';
import { GetCart } from './ignite/cart/GetCart';
import { GetCartById } from './ignite/cart/GetCartById';
import { GetMyCart } from './ignite/cart/GetMyCart';
import { RecalculateCart } from './ignite/cart/RecalculateCart';
import { UpdateCart } from './ignite/cart/UpdateCart';
import { GetCustomObjects } from './ignite/customobject/GetCustomObjects';
import { GetMyCustomObjects } from './ignite/customobject/GetMyCustomObjects';
import { GetInventory } from './ignite/inventory/GetInventory';
import { CreateOrder } from './ignite/order/CreateOrder';
import { GetOrderById } from './ignite/order/GetOrderById';
import { UpdateOrder } from './ignite/order/UpdateOrder';
import { CreatePayment } from './ignite/payment/CreatePayment';
import { CreateTransaction } from './ignite/payment/CreateTransaction';
import { GetPaymentById } from './ignite/payment/GetPaymentById';
import { UpdatePayment } from './ignite/payment/UpdatePayment';
import { GetAccessToken } from './ignite/token/GetAccessToken';
import { ReplicateCart } from './ignite/cart/ReplicateCart';
import { ApiClient } from './ignite/clients/apiClient';
import { AuthClient } from './ignite/clients/authClient';
import { GraphQLClient } from './ignite/clients/graphqlClient';
import { MeApiClient } from './ignite/clients/meApiClient';

export abstract class Ignite {
  public get getCart() {
    return new GetCart().execute;
  }

  public get getCartById() {
    return new GetCartById().execute;
  }

  public get getMyCart() {
    return new GetMyCart().execute;
  }

  public get recalculateCart() {
    return new RecalculateCart().execute;
  }

  public get updateCart() {
    return new UpdateCart().execute;
  }

  public get getCustomObjects() {
    return new GetCustomObjects().execute;
  }

  public get getMyCustomObjects() {
    return new GetMyCustomObjects().execute;
  }

  public get getInventory() {
    return new GetInventory().execute;
  }

  public get createOrder() {
    return new CreateOrder().execute;
  }

  public get getOrderById() {
    return new GetOrderById().execute;
  }

  public get updateOrder() {
    return new UpdateOrder().execute;
  }

  public get createPayment() {
    return new CreatePayment().execute;
  }

  public get createTransaction() {
    return new CreateTransaction().execute;
  }

  public get getPaymentById() {
    return new GetPaymentById().execute;
  }

  public get updatePayment() {
    return new UpdatePayment().execute;
  }

  public get getAccessToken() {
    return new GetAccessToken().execute;
  }

  public get getCustomObjectsCache() {
    return new Cache().getCustomObjectsCache;
  }

  public get setCustomObjectsCache() {
    return new Cache().setCustomObjectsCache;
  }

  public get replicateCart() {
    return new ReplicateCart().execute;
  }

  public get ApiClient() {
    return new ApiClient();
  }

  public get AuthClient() {
    return new AuthClient();
  }

  public get GraphQLClient() {
    return new GraphQLClient();
  }

  public async MeApiClient(authToken: string) {
    return new MeApiClient({ authToken });
  }
}
