import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart/cart.context";
import "./cart.style.scss";

export default function Cart() {
  const { cartItems, deleteItemFromCart } = useContext(CartContext);
  console.log(cartItems);
  return (
    <div className="cart-dropdown">
      <ul className="items-list">
        {cartItems &&
          cartItems.map((item) => (
            <li className="cart-item">
              <div className="item-img">
                <img src={item.variation_0_image}></img>
              </div>
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">$ {item.current_price}</span>
                <span className="item-quantity">quantity: {item.cartQuantity}</span>
                <div className="quantity-switcher">
                  <i class="fa-solid fa-plus"></i>
                  <i class="fa-solid fa-minus"></i>
                </div>
              </div>
              <div className="btn-remove">
                <i onClick={() => deleteItemFromCart(item)} class="fa-solid fa-trash-can"></i>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
