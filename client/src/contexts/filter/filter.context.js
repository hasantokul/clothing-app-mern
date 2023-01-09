import { createContext, useEffect, useState } from "react";

const colorOptions = ["Red", "Blue", "Brown", "Black", "Gray", "Yellow", "Pink", "White", "Orange", "Rose"]

export const FilterContext = createContext({
    onMinPriceChangeHandler : () => null,
    onMaxPriceChangeHandler : () => null,
    onMinLikesChangeHandler : () => null,
    onMaxLikesChangeHandler : () => null,
    toggleHandler : () => null,
    closeFilterHandler : () => null,
    toggleHandler : () => null,
    toggleHandler : () => null,
    addOnlineFilter : () => null,
    removeOnlineFilter : () => null,
    addColorFilter : () => null,
    removeColorFilter : () => null,
    addIsNewFilter : () => null,
    removeIsNewFilter : () => null,
    setFilterOpen : () => null,
    colorOptions: colorOptions,
    isNew: null,
    online: null,
    colors: null,
    filterOpen: null,
    priceRange: null
});

const addColorHelper = (colors, colorToAdd) => {
    return [...colors, colorToAdd];
}

const removeColorHelper = (colors, colorToRemove) => {
    return colors.filter((color) => color !== colorToRemove);
}

export const FilterProvider = ({children}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isNew, setIsNew] = useState(null);
  const [online, setOnline] = useState(null);
  const [colors, setColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const onMinPriceChangeHandler = (e) => {
    document.querySelector("#min-price").innerHTML = e.target.value
    setPriceRange([Number(e.target.value), priceRange[1]]);
  };
  const onMaxPriceChangeHandler = (e) => {
    document.querySelector("#max-price").innerHTML = e.target.value
    setPriceRange([priceRange[0], Number(e.target.value)]);
  };
  const addColorFilter = (colorToAdd) => setColors(addColorHelper(colors, colorToAdd));
  const removeColorFilter = (colorToRemove) => setColors(removeColorHelper(colors, colorToRemove));
  const onMinLikesChangeHandler = e => document.querySelector("#min-likes").innerHTML = e.target.value;
  const onMaxLikesChangeHandler = e => document.querySelector("#max-likes").innerHTML = e.target.value;
  const toggleHandler = () => setFilterOpen(!filterOpen);
  const closeFilterHandler = () => setFilterOpen(!filterOpen);
  const addOnlineFilter = () => setOnline(true);
  const removeOnlineFilter = () => setOnline(null);
  const addIsNewFilter = () => setIsNew(true);
  const removeIsNewFilter = () => setIsNew(null);

  const value = {
      colorOptions,
      onMinPriceChangeHandler,
      onMaxPriceChangeHandler,
      onMinLikesChangeHandler,
      onMaxLikesChangeHandler,
      toggleHandler,
      closeFilterHandler,
      filterOpen,
      colorOptions,
      addOnlineFilter,
      removeOnlineFilter,
      addColorFilter,
      removeColorFilter,
      addIsNewFilter,
      removeIsNewFilter,
      isNew,
      online,
      colors,
      priceRange,
      setFilterOpen
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}