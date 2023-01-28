import React, { useEffect } from "react";
import "./product.style.scss";

export default function Product() {
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
      imgElm.style.height = "100%";
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

  useEffect(() => {
    initializeImageEvents();
  }, [initializeImageEvents]);
  return (
    <div className="pdp-container">
      <div className="product-images">
        <div className="img-container">
          <img
            className="img-active"
            src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          ></img>
        </div>
        <div className="img-list">
          <img src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
          <img src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
        </div>
      </div>
      <div className="product-information">
        <span className="product-label">New</span>
        <span className="product-name">Nike Air Max</span>
        <span className="colors-title">COLORS</span>
        <ul className="variation-colors">
          <li>
            <span className="color">Black</span>
          </li>
          <li>
            <span className="color">Gray</span>
          </li>
        </ul>
        <span className="price">$100</span>
        <div className="add-basket-container">
          <button className="btn btn-dark">Add To Basket</button>
          <div className="quantity">
            <div className="minus">-</div>
            <div className="count">0</div>
            <div className="plus">+</div>
          </div>
        </div>
        <div className="description-container">
          <span className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            impedit inventore voluptatem numquam unde, minima exercitationem
            voluptatum veniam atque deserunt quae qui possimus a perferendis
            dicta, quibusdam aliquid architecto distinctio, voluptate error.
            Deleniti praesentium odit omnis placeat incidunt impedit,
            consequuntur et, exercitationem officia expedita, id numquam natus
            culpa? Possimus ipsum fugiat aliquam in vitae ad totam esse deleniti
            sunt repellendus!
          </span>
        </div>
      </div>
    </div>
  );
}
