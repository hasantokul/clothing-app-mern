import "./category.style.scss";

import React, { useContext, useEffect, use, useCallback, useState } from "react";
import {useParams} from "react-router-dom"
import { FilterContext } from "../../contexts/filter/filter.context";
import FilterBar from "../../components/filter-bar/filter-bar.component";
import ProductListing from "../../components/product-listing/product-listing.component";

export default function Category() {
  const {
    toggleHandler
  } = useContext(FilterContext);

  return (
    <div className="category-container">
      <div className="category-header">
        <div onClick={toggleHandler} className="filter-toggle">
          <span>Filters</span>
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className="category-body">
        <FilterBar/>
        <ProductListing/>
      </div>
    </div>
  );
}
