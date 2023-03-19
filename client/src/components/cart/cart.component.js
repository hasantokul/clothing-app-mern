import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/cart/cart.context";
import "./cart.style.scss";

export default function Cart() {
  const { cartItems, deleteItemFromCart } = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(null);

  const checkoutHandler = () => {
    console.log(cartItems);
    fetch("http://localhost:8000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        items: [...cartItems]
      })
    }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json));
    }).then(({url}) => {
      window.location = url;
    }).catch(e => {
      console.error(e.error)
    })
  }

  useEffect(() => {
    let total = 0;
    cartItems.map((item) => {
      total += item.current_price * item.cartQuantity
    });
    setCartTotal(total);
  },[cartItems]);
  return (
    <div className="cart-dropdown">
      <ul className="items-list">
        {cartItems.length > 0 ?
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
          )) : <span className="cart-message">No Items Added</span>}
      </ul>
      {
        cartItems.length > 0 && (
          <div className="cart-info">
            <span className="cart-total">Total : <span className="amount">$ {cartTotal}</span></span>
            <a onClick={checkoutHandler} className="btn-checkout">Checkout</a>
          </div>
        )
      }
      
    </div>
  );
}
