import { Cart, InventoryEntry, CT } from '@ignite/ctintegration-ct';
import { App } from '@ignite/ctintegration-do';

export class ValidateCart {
  private async hasInventoryExists(
    cart: Cart,
    inventory: { results: InventoryEntry[] },
  ) {
    return cart.lineItems.every((lineItem) => {
      // Match sku and supplyChannel for cart and inventory
      const inv = inventory?.results?.find(
        (item) =>
          item.sku === lineItem.variant.sku &&
          item.supplyChannel?.id === lineItem.supplyChannel?.id,
      ) || { availableQuantity: 0 };
      // if it less than cart stock => return false
      return !(inv?.availableQuantity < lineItem.quantity);
    });
  }

  public async execute(payload: App.Types.Ignite.ValidateCartPayload) {
    let cart;
    if (payload.me) {
      if (!payload.authToken) {
        throw {
          message: "Required parameter 'authToken' is missing or empty",
          statusCode: 500,
        };
      }
      const { cart: myCart } = await CT.Core.getMyCart(payload.authToken);
      cart = myCart;
    } else {
      if (!payload.cartId) {
        throw {
          message: "Required parameter 'cartId' is missing or empty",
          statusCode: 500,
        };
      }
      const { cart: customerCart } = await CT.Core.getCart(
        payload.cartId,
        payload.authToken,
      );
      cart = customerCart;
    }

    // check cart inventoryMode and lineItems inventoryMode is 'none'
    if (App.Mappers.default.hasDefaultInventoryMode(cart)) {
      return App.Mappers.default.returnInventoryResponse(true);
    }
    const inventory = await CT.Core.getInventory(
      payload.authToken,
      App.Mappers.default.getCartSkus(cart),
    );
    if (!inventory.exists) {
      return App.Mappers.default.returnInventoryResponse(false);
    }

    const hasInventory = await this.hasInventoryExists(cart, inventory);

    // Recalculate cart
    const recalculatedCart = await CT.Core.recalculateCart(
      payload.authToken,
      cart,
    );
    if (!recalculatedCart.id) {
      return App.Mappers.default.returnInventoryResponse(false);
    }

    return App.Mappers.default.returnInventoryResponse(hasInventory);
  }
}
