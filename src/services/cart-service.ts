import { OrderDTO, OrderItemDTO } from "../models/order";

import * as cartRepository from "../localStorage/cart-repository";
import { ProductDTO } from "../models/product";

export function saveCart(cart: OrderDTO) {
  cartRepository.save(cart);
}

export function getCart(): OrderDTO {
  return cartRepository.get();
}

export function addProduct(product: ProductDTO) {
  const cart = cartRepository.get();
  const item = cart.items.find((x) => x.productId === product.id);

  if (!item) {
    const newProduct = new OrderItemDTO(
      product.id,
      1,
      product.name,
      product.price,
      product.imgUrl
    );
    cart.items.push(newProduct);
    cartRepository.save(cart);
  }
}

export function clearCart() {
  cartRepository.clear();
}

export function increaseItem(productID: number) {
  const cart = cartRepository.get();
  const item = cart.items.find((x) => x.productId === productID);
  if (item) {
    item.quantity++;
    cartRepository.save(cart);
  }
}

export function decreaseItem(productID: number) {
      const cart = cartRepository.get();
      const item = cart.items.find((x) => x.productId === productID);
      if (item) {
        item.quantity--;
        if( item.quantity < 1 ) {
           cart.items =  cart.items.filter( x => x.productId !== productID)
        }
        cartRepository.save(cart);
      }
    }
    
