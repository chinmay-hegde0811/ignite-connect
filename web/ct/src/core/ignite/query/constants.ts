export const CREATE_ORDER_MUTATION = `
  mutation($id: String!, $version: Long!, $paymentState: PaymentState) {
    createOrderFromCart(draft: {id: $id, version: $version, paymentState: $paymentState}) {
      id
      version
      paymentState
      createdAt
    }
  }
`;

export const CREATE_PAYMENT_MUTATION = `
  mutation ($draft: PaymentDraft!) {
    createPayment(draft: $draft) {
      id
      version
    }
  }
`;

export const UPDATE_PAYMENT_MUTATION = `
  mutation (
      $paymentId:String!,
      $paymentVersion: Long!,
      $methodInfoName: String!,
      $methodInfoLocale: Locale!,
    ) {
      # Payment update actions
      updatePayment: updatePayment(
        # The current version of the Payment.
        version: $paymentVersion
    
        # The id of the Customer to update.
        id: $paymentId
    
        # An array of update actions.
        actions: [
          {
            # The action to change the method info name.
            setMethodInfoName:{
              name:{
                locale:$methodInfoLocale,
                value:$methodInfoName
              }
            }
          },
        ]
      ) {
        # Return the id, version
        id
        version
      }
    }
  `;

export const CREATE_TRANSACTION_MUTATION = `
  mutation (
      $id:String!,
      $version: Long!,
      $amount: MoneyInput!,
      $time: DateTime!,
      $type:TransactionType!) {
        updatePayment: updatePayment(
              version: $version
              id: $id
          
              # An array of update actions.
              actions: [
                {
                  addTransaction:{ 
                  
                   transaction:{
                    timestamp: $time,
                    type: $type
                    amount: $amount
                  }
                  
                  }
                }
              ]
            ) {
              # Return the id, version
              id
              version
            }
      }
  `;

export const GET_CART_QUERY = `
  query($cartId: String!) {
      cart(id: $cartId) {
        id
        version
        customerId
        customerEmail
        customer {
          id
          version
          salutation
          firstName
          middleName
          lastName
          dateOfBirth
          email
        }
        anonymousId
        taxCalculationMode
        totalPrice {
          currencyCode
          centAmount
        }
        taxedPrice{
          totalTax {
            currencyCode
            centAmount
          }
          totalGross{
            currencyCode
            centAmount
          }
        }
        billingAddress {
          apartment
          building
          streetName
          streetNumber
          postalCode
          city
          state
          country
          additionalAddressInfo
        }
        shippingAddress{
          title
          firstName
          lastName
          apartment
          building
          streetName
          streetNumber
          additionalStreetInfo
          country
          city
          state
          postalCode
        }
        taxedShippingPrice{
          totalNet{
            currencyCode
            centAmount
          }
          totalTax {
            currencyCode
            centAmount
          }
        }
        lineItems {
          id
          productId
          totalPrice {
            currencyCode
            centAmount
          }
          taxedPrice {
            totalTax {
              currencyCode
              centAmount
            }
            totalGross{
              currencyCode
              centAmount
            }
          }
          taxRate {
            amount
            includedInPrice
          }
          supplyChannel {
            id
          }
          inventoryMode
          quantity
          discountedPricePerQuantity {
            quantity
            discountedPrice {
              value {
                currencyCode
                centAmount
              }
            }
          }
          price {
            value {
              currencyCode
              centAmount
            }
            discounted {
              value {
                centAmount
              }
            }
          }
          productType {
            name
            description
          }
          variant {
            id
            sku
            images {
              url
            }
          }
        }
        country
        locale
        inventoryMode
        cartState
      }
  }
`;

export const UPDATE_ORDER_PAYMENT_STATES_MUTATION = `
mutation ($id: String, $version: Long!, $orderState: OrderState!, $paymentState: PaymentState!) {
    updateOrder(
      id: $id,
      version: $version,
      actions: [
        {
          changeOrderState: {
            orderState: $orderState
          }
        },
        {
          changePaymentState: {
            paymentState: $paymentState
          }
        }
      ]
    ) {
      id
      version
      orderState
      paymentState
    }
  }
`;

export const UPDATE_ORDER_STATE_MUTATION = `
mutation ($id: String, $version: Long!,$orderState: OrderState!) {
    updateOrder(
      id: $id,
      version:  $version,
      actions: [
        {
        changeOrderState: {
          orderState: $orderState
        }
      }
      ]
    ) {
      id
      version
    	orderState
      paymentState
    }
  }
`;

export const UPDATE_CART_ADD_PAYMENT_MUTATION = `
 mutation ($id: String, $version: Long!, $paymentId:String!) {
    updateCart(
      id: $id,
      version: $version,
      actions:[{
        addPayment:{
          payment:{
            id: $paymentId
          }
        }
      }]
    ){
      id
      version
    }
  }
`;

export const GET_CART_BY_ID_QUERY = `
  query ($cartId:String!) {
    cart(id:$cartId){
      id
       version
       customerId
       anonymousId
       taxCalculationMode
       totalPrice {
         currencyCode
         centAmount
       }
       taxedPrice{
         totalTax {
           currencyCode
           centAmount
         }
         totalGross{
           currencyCode
           centAmount
         }
       }
       billingAddress {
         apartment
         building
         streetName
         streetNumber
         postalCode
         city
         state
         country
         additionalAddressInfo
       }
       lineItems {
         id
         productId
         taxedPrice {
           totalTax {
             currencyCode
             centAmount
           }
           totalGross{
             currencyCode
             centAmount
           }
         }
         taxRate {
           includedInPrice
         }
         supplyChannel {
           id
         }
         inventoryMode
         quantity
         discountedPricePerQuantity {
           quantity
           discountedPrice {
             value {
               currencyCode
               centAmount
             }
           }
         }
         price {
           value {
             currencyCode
             centAmount
           }
           discounted {
             value {
               centAmount
             }
           }
         }
         productType {
           name
         }
         variant {
           id
           sku
           images {
             url
           }
         }
       }
       country
       locale
       inventoryMode
     }
  }
`;

export const GET_CUSTOM_OBJECTS_QUERY = `
    query($containerName: String!, $key: String!)  {
        customObject (container: $containerName, key:$key) {
            id
            key
            container
            value
        }
    }
`;

export const GET_INVENTORY_QUERY = `
query ($where: String!, $limit: Int) {
  inventoryEntries(where: $where, limit:$limit) {
    total
    count
    exists
    results {
      id
      version
      sku
      quantityOnStock
      availableQuantity
      key
      expectedDelivery
      supplyChannel{
        id
      }
    }
  }
}  
`;

export const GET_MY_CART_QUERY = `
query {
  me {
    customer {
      id
      version
      firstName
      middleName
      lastName
      email
    }
    activeCart {
      id
      version
      customerId
      customerEmail
      customer {
        id
        version
        salutation
        firstName
        middleName
        lastName
        dateOfBirth
        email
      }
      anonymousId
      taxCalculationMode
      totalPrice {
        currencyCode
        centAmount
      }
      taxedPrice{
        totalTax {
          currencyCode
          centAmount
        }
        totalGross{
          currencyCode
          centAmount
        }
      }
      billingAddress {
        apartment
        building
        streetName
        streetNumber
        postalCode
        city
        state
        country
        additionalAddressInfo
      }
      shippingAddress{
        title
        firstName
        lastName
        apartment
        building
        streetName
        streetNumber
        additionalStreetInfo
        country
        city
        state
        postalCode
      }
      taxedShippingPrice{
        totalNet{
          currencyCode
          centAmount
        }
        totalTax {
          currencyCode
          centAmount
        }
      }
      lineItems {
        id
        productId
        totalPrice {
          currencyCode
          centAmount
        }
        taxedPrice {
          totalTax {
            currencyCode
            centAmount
          }
          totalGross{
            currencyCode
            centAmount
          }
        }
        taxRate {
          amount
          includedInPrice
        }
        supplyChannel {
          id
        }
        inventoryMode
        quantity
        discountedPricePerQuantity {
          quantity
          discountedPrice {
            value {
              currencyCode
              centAmount
            }
          }
        }
        price {
          value {
            currencyCode
            centAmount
          }
          discounted {
            value {
              centAmount
            }
          }
        }
        productType {
          name
          description
        }
        variant {
          id
          sku
          images {
            url
          }
        }
      }
      country
      locale
      inventoryMode
      cartState
    }
  }

}
`;

export const GET_MY_CUSTOM_OBJECT_QUERY = `
    query($containerName: String!, $key: String!)  {
        customObject (container: $containerName, key:$key) {
            id
            key
            container
            value
        }
    }
`;

export const GET_ORDER_BY_ID_QUERY = `
query ($orderId: String!) {
  order(id: $orderId) {
    id
    version
    orderNumber
    orderState
    paymentState
    customerEmail
    taxedPrice {
      totalGross {
        centAmount
      }
    }
    cart {
      id
    }
    lineItems{
      id
      productId
      quantity
      totalPrice{
        centAmount
      }
      price{
        value{
          centAmount
        }
        discounted{
          value{
            centAmount
          }
        }
      }
      taxRate {
         includedInPrice
      }
      taxedPrice{
        totalNet{
          centAmount
        }
        totalGross{
          centAmount
        }
      }
    }
    paymentInfo{
      payments {
        id
        version
        lastModifiedAt
        interfaceId
        paymentMethodInfo {
          paymentInterface
        }
        custom {
          customFieldsRaw {
            name
            value
          }
        }
        transactions {
          id
          type
          state
          amount {
            currencyCode
            centAmount
          }
          custom {
            customFieldsRaw {
              name
              value
            }
          }
        }
      }
    }
    taxedPrice{
      taxPortions{
        rate
        amount{
          centAmount
        }
      }
      totalNet{
        currencyCode
        centAmount
      }
      totalGross {
        currencyCode
        centAmount
      }
    }
  }
}
`;

export const GET_PAYMENT_BY_ID_QUERY = `
query ($paymentId:String!) {
  payment(id:$paymentId){
      id
      version
      amountPlanned{
        centAmount
        currencyCode
      }
    transactions {
      id
      type
      amount {
        type
        currencyCode
        centAmount
        fractionDigits
      }
    }
  }
}
`;

export const RECALCULATE_CART_QUERY = `
mutation(
    $id: String!, 
    $version: Long!, 
    $updateProductData: Boolean
  ) {
    updateCart(
      id:$id,
      version:$version,
      actions:[{
        recalculate : {
          updateProductData: $updateProductData
        }
      }]
    ){
      id
      version
    }
  }
`;

export const REPLICATE_CART_MUTATION = `
mutation($cartId: String!) {
  replicateCart(reference: {typeId: "cart", id: $cartId}) {
    cartState
    customer {
      firstName
      lastName
    }
    id
    version
  }
}
`;

export const UPDATE_ORDER_ADD_PAYMENT_MUTATION = `
mutation ($id: String!, $version: Long!, $paymentId: String!) {
  updateOrder(
    id: $id
    version: $version
    actions: [
      {
        addPayment: {
          payment: {
            id: $paymentId
          }
        }
      }
    ]
  ) {
    id
    version
    orderState
    paymentState
  }
}
`;
