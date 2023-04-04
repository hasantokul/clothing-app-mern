import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: null,
  addItemToCart: () => null,
  deleteItemFromCart: () => null,
  cartOpen: null,
  setCartOpen: () => null
});

const addItemToCartHelper = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find((item) => item.pid === itemToAdd.pid);
  console.log(cartItems);
  console.log(existingCartItem);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.pid === itemToAdd.pid
        ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...itemToAdd, cartQuantity: 1 }];
};

const deleteItemFromCartHelper = (cartItems, itemToRemove) => {
    return cartItems.filter(item => item.pid !== itemToRemove.pid);
}

const getCartItems = () => {
  const cartItemsStoreage = JSON.parse(localStorage.getItem("cart-items"));
  if (cartItemsStoreage) {
    return cartItemsStoreage;
  }
  return [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCartItems());
  const [cartOpen, setCartOpen] = useState(false);
  console.log(cartItems);

  const addItemToCart = (itemToAdd) => {
    setCartItems(addItemToCartHelper(cartItems, itemToAdd));
  };

  const deleteItemFromCart = (itemToRemove) => {
    setCartItems(deleteItemFromCartHelper(cartItems, itemToRemove));
  }

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    cartItems,
    addItemToCart,
    deleteItemFromCart,
    cartOpen,
    setCartOpen
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
