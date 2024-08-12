import { Cart } from '@commercetools/platform-sdk';

export class ValidateCart {
  public static hasDefaultInventoryMode(cart: Cart) {
    const inventoryMode = cart?.inventoryMode === 'None';
    const lineItemsInventoryMode = cart?.lineItems?.every(
      (lineItem) =>
        lineItem?.inventoryMode === 'None' || lineItem?.inventoryMode === null,
    );
    return inventoryMode && lineItemsInventoryMode;
  }

  public static getCartSkus(cart: Cart) {
    const skus = cart.lineItems.map((item) => `"${item.variant.sku}"`);
    return skus.join(',');
  }

  public static returnInventoryResponse = (hasInventory: boolean) => ({
    hasInventory,
  });
}
