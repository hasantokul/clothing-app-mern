import "./category.style.scss";

import React, { useContext, useEffect, use, useCallback, useState } from "react";
import {useParams} from "react-router-dom"
import { FilterContext } from "../../contexts/filter/filter.context";

export default function Category() {
  const {
    colorOptions,
    onMaxLikesChangeHandler,
    onMaxPriceChangeHandler,
    onMinLikesChangeHandler,
    onMinPriceChangeHandler,
    toggleHandler,
    closeFilterHandler,
    filterOpen
  } = useContext(FilterContext);

  useEffect(() => {
    if (!filterOpen) {
      document.querySelector(".filter-sidebar").style.transform = "translateX(-200px)";
      document.querySelector(".filter-sidebar").style.position = "absolute";
      document.querySelector(".product-listing").style.gridTemplateColumns = "repeat(4,270px)";
    } else {
      document.querySelector(".filter-sidebar").style.position = "initial";
      document.querySelector(".filter-sidebar").style.transform = "translateX(0px)";
      document.querySelector(".product-listing").style.gridTemplateColumns = "repeat(3,270px)";
    }
  }, [filterOpen]);

  const [products, setProducts] = useState([]);

  const category = useParams().id;

  const getProducts = useCallback(async () => {
    const response = await fetch(`http://localhost:8000/products/${category}`);
    const products = await response.json();
    setProducts(products);
  });

  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <div onClick={toggleHandler} className="filter-toggle">
          <span>Filters</span>
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>

      <div className="category-body">
        <div className="filter-sidebar">
          <div className="filters-header">
            <i onClick={closeFilterHandler} class="fa-solid fa-xmark"></i>
          </div>
          <div className="filters-body">
            <ul className="filters-list">
              <li className="filter">
                <span className="filter-title">Price</span>
                <span id="min-price" className="min-value">
                  500
                </span>
                -
                <span id="max-price" className="max-value">
                  1500
                </span>{" "}
                $
                <div className="sliders">
                  <input
                    className="range"
                    min="0"
                    max="1000"
                    step="1"
                    type="range"
                    onInput={onMinPriceChangeHandler}
                  />
                  <input
                    className="range"
                    min="1001"
                    max="2000"
                    step="1"
                    type="range"
                    onInput={onMaxPriceChangeHandler}
                  />
                </div>
              </li>
              <li className="filter">
                <span className="filter-title">Model</span>
                <ul className="filter-options">
                  <li className="option">
                    New <input type="checkbox" />
                  </li>
                </ul>
              </li>
              <li className="filter">
                <span className="filter-title">Variation Color</span>
                <ul className="filter-options">
                  {
                    colorOptions.map((color) => (
                      <li value={color} className="option">
                        {color} <input type="checkbox" />
                      </li>
                    ))
                  }
                </ul>
              </li>
              <li className="filter">
                <span className="filter-title">Likes</span>
                <span id="min-likes" className="min-value">
                  250
                </span>
                -
                <span id="max-likes" className="max-value">
                  750
                </span>{" "}
                $
                <div className="sliders">
                  <input
                    className="range"
                    min="0"
                    max="500"
                    step="1"
                    type="range"
                    onInput={onMinLikesChangeHandler}
                  />
                  <input
                    className="range"
                    min="501"
                    max="1000"
                    step="1"
                    type="range"
                    onInput={onMaxLikesChangeHandler}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="product-listing">
          {products.map((product) => (

          <div className="product-card">
            <div className="product-img" style={{ background : `url(${product.image_url}) center center/cover` }}></div>
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <div className="product-values">
                <span className="product-price"> $ {product.current_price}</span>
                <i class="fa-solid fa-heart"></i>
                <span className="product-likes">{product.likes_count}</span>
              </div>
              

            </div>
          </div>

          ))}
        </div>
      </div>
    </div>
  );
}
