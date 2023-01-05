import React, { useEffect, useState, useCallback, Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import "./navigation.style.scss";

export default function Navigation() {
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    const response = await fetch("http://localhost:8000/categories");
    const fetchedCategories = await response.json();
    setCategories(fetchedCategories);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Fragment>
      <div className="navbar">
        <div className="nav-container">
          <div className="nav-items">
            <div className="nav-logo">
              <h1><Link to="/">MORBIN</Link></h1>
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
                    <span onClick={() => window.location.href = `/categories/${category.id}`}>{category.name}</span>
                    <div className="category-dropdown">
                      <ul className="sub-categories-list">
                        {category.subcategories.map((subcategory) => (
                          <li onClick={() => window.location.href = `/categories/${subcategory.name}`} className="sub-category">
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
      <Outlet />
    </Fragment>
  );
}
