import { createContext, useEffect, useState } from "react";

const colorOptions = ["Red", "Blue", "Brown", "Black", "Gray", "Yellow", "Pink", "White", "Orange"]

export const FilterContext = createContext({
    colorOptions: colorOptions,
    onMinPriceChangeHandler : () => null,
    onMaxPriceChangeHandler : () => null,
    onMinLikesChangeHandler : () => null,
    onMaxLikesChangeHandler : () => null,
    toggleHandler : () => null,
    closeFilterHandler : () => null,
    toggleHandler : () => null,
    toggleHandler : () => null,
    filterOpen: null
});

export const FilterProvider = ({children}) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const onMinPriceChangeHandler = e => document.querySelector("#min-price").innerHTML = e.target.value;
  const onMaxPriceChangeHandler = e => document.querySelector("#max-price").innerHTML = e.target.value;
  const onMinLikesChangeHandler = e => document.querySelector("#min-likes").innerHTML = e.target.value;
  const onMaxLikesChangeHandler = e => document.querySelector("#max-likes").innerHTML = e.target.value;
  const toggleHandler = () => setFilterOpen(!filterOpen);
  const closeFilterHandler = () => setFilterOpen(!filterOpen);

    const value = {
        colorOptions,
        onMinPriceChangeHandler,
        onMaxPriceChangeHandler,
        onMinLikesChangeHandler,
        onMaxLikesChangeHandler,
        toggleHandler,
        closeFilterHandler,
        filterOpen,
        colorOptions
    }

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}