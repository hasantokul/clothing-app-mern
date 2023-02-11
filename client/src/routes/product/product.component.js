import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/cart/cart.context";
import "./product.style.scss";

export default function Product() {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const {addItemToCart} = useContext(CartContext);

  const getProduct = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8000/products/product/${pid}`
    );
    const fetchedProduct = await response.json();
    setProduct(fetchedProduct);
  });

  const addToCartHandler = () => {
    addItemToCart(product);
  }

  const initializeImageEvents = () => {
    const imgContElm = document.querySelector(".img-container");
    const imgElm = document.querySelector(".img-active");
    const listImages = document.querySelectorAll(".img-list img");

    const ZOOM = 300;

    imgContElm.addEventListener("mouseenter", () => {
      imgElm.style.width = ZOOM + "%";
      imgElm.style.height = "auto";
    });

    imgContElm.addEventListener("mouseleave", () => {
      imgElm.style.width = "100%";
      imgElm.style.height = "auto";
      imgElm.style.top = "0";
      imgElm.style.left = "0";
    });

    imgContElm.addEventListener("mousemove", (e) => {
      let obj = imgContElm;
      let obj_left = 0;
      let obj_top = 0;
      let xpos;
      let ypos;

      while (obj.offsetParent) {
        obj_left += obj.offsetLeft;
        obj_top += obj.offsetTop;
        obj = obj.offsetParent;
      }
      if (e) {
        xpos = e.pageX;
        ypos = e.pageY;
      } else {
        xpos = window.event.x + document.body.scrollLeft - 2;
        ypos = window.event.y + document.body.scrollTop - 2;
      }
      xpos -= obj_left;
      ypos -= obj_top;

      const imgWidth = imgElm.clientWidth;
      const imgHeight = imgElm.clientHeight;

      imgElm.style.top =
        -(
          ((imgHeight - imgContElm.clientHeight) * ypos) /
          imgContElm.clientHeight
        ) + "px";
      imgElm.style.left =
        -(
          ((imgWidth - imgContElm.clientWidth) * xpos) /
          imgContElm.clientWidth
        ) + "px";
    });

    listImages.forEach((img) => {
      img.addEventListener("click", () => {
        imgElm.src = img.src;
      });
    });
  };

  const readMoreHandler = () => {
    document.querySelector(".description-container").style.height = "auto";
    document.querySelector(".read-more").style.display = "none";
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    product && initializeImageEvents();
  }, [initializeImageEvents]);
  return (
    product && (
      <div className="pdp-container">
        <div className="product-images">
          <div className="img-container">
            <img className="img-active" src={product.variation_0_image}></img>
          </div>
          <div className="img-list">
            <img src={product.variation_0_image}></img>
            <img src={product.variation_1_image}></img>
          </div>
        </div>
        <div className="product-information">
          {product.is_new && <span className="product-label">New</span>}
          <span className="product-name">{product.name}</span>
          <span className="colors-title">COLORS</span>
          <ul className="variation-colors">
            <li>
              <span className="color">{product.variation_0_color}</span>
            </li>
            <li>
              <span className="color">{product.variation_1_color}</span>
            </li>
          </ul>
          <span className="price">$ {product.current_price}</span>
          <div className="payment-options">
            <span className="payment-title">Payment Options :</span>
            <i class="fa-brands fa-cc-stripe"></i>
            <i class="fa-brands fa-cc-paypal"></i>
            {/* <i class="fa-brands fa-cc-visa"></i>
            <i class="fa-brands fa-cc-mastercard"></i> */}
          </div>
          <div className="add-basket-container">
            <button onClick={ addToCartHandler } className="btn btn-dark">Add To Basket</button>
            <div className="quantity">
              <div className="minus">-</div>
              <div className="count">0</div>
              <div className="plus">+</div>
            </div>
          </div>
          <div className="description-container">
            <span className="description">
              <span className="description-title">Description :</span> Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
              impedit inventore voluptatem numquam unde, minima exercitationem
              voluptatum veniam atque deserunt quae qui possimus a perferendis
              dicta, quibusdam aliquid architecto distinctio, voluptate error.
              Deleniti praesentium odit omnis placeat incidunt impedit,
              consequuntur et, exercitationem officia expedita, id numquam natus
              culpa? Possimus ipsum fugiat aliquam in vitae ad totam esse
              deleniti sunt repellendus!
            </span>
          </div>
          <span onClick={readMoreHandler} className="read-more">
            Read More
          </span>
        </div>
      </div>
    )
  );
}
