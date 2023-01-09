import React, { useContext, useEffect } from "react";
import "./filter-bar.style.scss";
import { FilterContext } from "../../contexts/filter/filter.context";
export default function FilterBar() {
  const {
    filterOpen,
    colorOptions,
    onMaxLikesChangeHandler,
    onMaxPriceChangeHandler,
    onMinLikesChangeHandler,
    onMinPriceChangeHandler,
    closeFilterHandler,
    addColorFilter,
    addIsNewFilter,
    addOnlineFilter,
    removeColorFilter,
    removeIsNewFilter,
    removeOnlineFilter,
    setFilterOpen
  } = useContext(FilterContext);

  const colorCheckHandler = (e) => {
    e.target.checked ? addColorFilter(e.target.value) : removeColorFilter(e.target.value);
  }
  const isNewCheckHandler = (e) => {
    e.target.checked ? addIsNewFilter() : removeIsNewFilter();
  }
  const onlineCheckHandler = (e) => {
    e.target.checked ? addOnlineFilter() : removeOnlineFilter();
  }

  useEffect(() => {
    if (!filterOpen) {
      document.querySelector(".filter-sidebar").style.transform = "translateX(-100%)";
      document.querySelector(".filter-sidebar").style.position = "absolute";
    } else {
      document.querySelector(".filter-sidebar").style.position = "initial";
      document.querySelector(".filter-sidebar").style.transform = "translateX(0)";
    }
  }, [filterOpen]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      document.querySelector(".filter-sidebar").style.transform = "translateX(-100%)";
      document.querySelector(".filter-sidebar").style.position = "absolute";
      setFilterOpen(false);
    })
  }, [window.innerWidth]);

  return (
    <div className="filter-sidebar">
      <div className="filters-header">
        <i onClick={closeFilterHandler} class="fa-solid fa-xmark"></i>
      </div>
      <div className="filters-body">
        <ul className="filters-list">
          <li className="filter">
            <span className="filter-title">Availablity</span>
            <ul className="filter-options">
              <li className="option">
                Online <input onClick={onlineCheckHandler} value="online" type="checkbox" />
              </li>
            </ul>
          </li>
          <li className="filter">
            <span className="filter-title">Price</span>
            <span id="min-price" className="min-value">
              0
            </span>
            -
            <span id="max-price" className="max-value">
              200
            </span>{" "}
            $
            <div className="sliders">
              <input
                className="range"
                min="0"
                max="100"
                step="1"
                type="range"
                onInput={onMinPriceChangeHandler}
              />
              <input
                className="range"
                min="101"
                max="200"
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
                New <input onChange={isNewCheckHandler} value="new" type="checkbox" />
              </li>
            </ul>
          </li>
          <li className="filter">
            <span className="filter-title">Variation Color</span>
            <ul className="filter-options">
              {colorOptions.map((color) => (
                <li className="option">
                  {color} <input onChange={colorCheckHandler} value={color} type="checkbox" />
                </li>
              ))}
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
  );
}
