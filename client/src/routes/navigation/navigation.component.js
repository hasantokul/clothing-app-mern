import React, { useEffect, useState, useCallback } from "react";
import "./navigation.style.scss";

export default function Navigation() {
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    const response = await fetch("http://localhost:8000/categories");
    const fetchedCategories = await response.json();
    console.log(fetchedCategories);
    setCategories(fetchedCategories);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="nav-items">
          <div className="nav-logo">
            <h1>MORBIN</h1>
          </div>
          <div className="nav-search">
            <div className="input-wrapper">
              <input className="search-field" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className="nav-user">
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="nav-basket">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
        <div className="category-menu">
          <ul className="categories-list">
            {categories &&
              categories.map((category) => (
                <li className="category">
                  {category.name}
                  <div className="category-dropdown">
                    <ul className="sub-categories-list">
                      {category.subcategories.map((subcategory) => (
                        <li className="sub-category">
                          <img
                            src={subcategory.image_url}
                            className="category-image"
                          ></img>
                          <span className="category-title">
                            {subcategory.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}