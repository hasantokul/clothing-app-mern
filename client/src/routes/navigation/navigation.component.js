import React, { useEffect, useState, useCallback, Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Cart from "../../components/cart/cart.component";
import UserMenu from "../../components/user-menu/user-menu.component";
import { UserContext } from "../../contexts/user/user.context";
import "./navigation.style.scss";

export default function Navigation() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const getCategories = useCallback(async () => {
    const response = await fetch("http://localhost:8000/categories");
    const fetchedCategories = await response.json();
    setCategories(fetchedCategories);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const toggleHandler = () => {
    setMenuOpen(!menuOpen);
  }

  const userMenuHandler = () => {
    setUserMenuOpen(!userMenuOpen);
  }

  const cartOpenHandler = () => {
    setCartOpen(!cartOpen)
  }

  useEffect(() => {
    if (window.innerWidth < 950) {
      if(!menuOpen) {
        document.querySelector(".category-menu").style.display = "none"
      } else {
        document.querySelector(".category-menu").style.display = "block"
      }
    }
  }, [menuOpen]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 950) {
        document.querySelector(".category-menu").style.display = "block";
        setMenuOpen(true);
      } else {
        document.querySelector(".category-menu").style.display = "none";
        setMenuOpen(false);
      }
    })
  },[window.innerWidth]);

  useEffect(() => {
    var scrollBefore = 0;
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      if (window.pageYOffset) {
        document.querySelector(".category-menu").style.display = "none"
        document.querySelector(".navbar").style.position = "fixed";
        document.querySelector(".navbar").style.zIndex = "2";
        if (scrollBefore <= scrolled) {
          scrollBefore = scrolled
         document.querySelector(".navbar").style.transform = "translateY(-100%)";
         document.querySelector(".navbar").style.pointerEvents = "none";
        } else if (scrollBefore > scrolled) {
          scrollBefore = scrolled
          document.querySelector(".navbar").style.transform = "none";
          document.querySelector(".navbar").style.pointerEvents = "all";
        }
      } else {
        document.querySelector(".category-menu").style.display = "block"
        document.querySelector(".navbar").style.position = "initial";
        document.querySelector(".navbar").style.zIndex = "1";
      }
    })
  })

  return (
    <Fragment>
      <div className="navbar">
        <div className="nav-container">
          <div className="nav-items">
            <i onClick={toggleHandler} class="fa-solid fa-bars"></i>
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
              <i onClick={userMenuHandler} class="fa-solid fa-user"></i>
              { userMenuOpen && <UserMenu/> }
            </div>
            <div className="nav-basket">
              <i onClick={cartOpenHandler} class="fa-solid fa-cart-shopping"></i>
              { cartOpen && <Cart/>}
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
