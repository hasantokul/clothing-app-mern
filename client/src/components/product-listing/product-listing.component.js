import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterContext } from "../../contexts/filter/filter.context";
import "./product-listing.style.scss";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [productsToFilter, setProductsToFilter] = useState([]);
  const category = useParams().id;
  const { filterOpen, colors, online, isNew, priceRange } = useContext(FilterContext);

  const getProducts = useCallback(async () => {
    const response = await fetch(`http://localhost:8000/products/${category}`);
    const fetchedProducts = await response.json();
    setProducts(fetchedProducts);
    setProductsToFilter(fetchedProducts);
  });

  const applyFilters = () => {
    let filteredProducts = productsToFilter;

    colors.length &&
      (filteredProducts = filteredProducts.filter((prod) =>
        colors.includes(prod.variation_0_color)
      ));

    online &&
      (filteredProducts = filteredProducts.filter((prod) => prod.quantity > 0));

    isNew &&
      (filteredProducts = filteredProducts.filter((prod) => prod.is_new));

    filteredProducts = filteredProducts.filter(
      (prod) => prod.current_price >= priceRange[0] && prod.current_price <= priceRange[1]
    );

    setProducts(filteredProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [colors, online, isNew, priceRange]);

  useEffect(() => {
    if (!filterOpen) {
      document.querySelector(".product-listing").style.width = "100%";
    } else {
      if (window.innerWidth > 600) {
        document.querySelector(".product-listing").style.width = "calc(100% - 200px)";
      } else {
        document.querySelector(".product-listing").style.width = "calc(100%)";
      }
    }
  }, [filterOpen]);

  return (
    <div className="product-listing">
      {products.map((product) => (
        <div className="product-card">
          <div
            className="product-img"
            style={{
              background: `url(${product.variation_0_image}) center center/cover`,
            }}
          ></div>
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
  );
}
