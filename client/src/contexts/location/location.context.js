import { createContext, useEffect, useState } from "react";

export const LocationContext = createContext({
  countries: [],
  cities: [],
  country: null,
  city: null,
  selectCountryHandler: () => null,
  selectCityHandler: () => null,
});

export const LocationProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);

  const getToken = async () => {
    const response = await fetch(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      {
        type: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-token":
            "a_15Gvi6iKOjneDXrGGLrhSc_LJN-XWv8bfFwRsWJEJCxvss87DhLQcJYLxg8JoZ0wA",
          "user-email": "tokulhasan24@gmail.com",
        },
      }
    );
    const tokenJson = await response.json();
    const authToken = tokenJson.auth_token;
    setToken(authToken);
  };

  const getCountries = async () => {
    const response = await fetch(
      "https://www.universal-tutorial.com/api/countries",
      {
        type: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const countriesJson = await response.json();
    setCountries(countriesJson);
  };

  const getCitiesByCountry = async () => {
    const response = await fetch(
      `https://www.universal-tutorial.com/api/states/${country}`,
      {
        type: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const citiesJson = await response.json();
    setCities(citiesJson);
  };

  const selectCountryHandler = (e) => {
    setCountry(e.target.value);
  };

  const selectCityHandler = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) getCountries();
  }, [token]);

  useEffect(() => {
    if (country) getCitiesByCountry();
  }, [country]);

  const value = {
    countries,
    country,
    cities,
    city,
    selectCountryHandler,
    selectCityHandler,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
