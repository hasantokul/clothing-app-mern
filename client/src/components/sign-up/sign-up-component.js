import { async } from "@firebase/util";
import e from "cors";
import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../contexts/location/location.context";
import { signUpUser } from "../../utils/firebase/firebase.utils";
import "./sign-up.style.scss";

export default function SignUp() {
  const defaultFormFileds = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFileds);
  const {
    selectCountryHandler,
    selectCityHandler,
    countries,
    cities,
    country,
    city,
  } = useContext(LocationContext);
  const {
    email,
    password,
    confirmPassword
  } = formFields;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("please check your credentials");
      return;
    };
    return await signUpUser(email, password, {...formFields, country, city});
  }

  return (
    <div className="sign-up-container">
      <h2 className="from-title">Don't Have an Account ? Sign Up Now !</h2>
      <form onSubmit={onSubmitHandler} className="form">
        <label className="field-label">Full Name</label>
        <input
          onChange={onChangeHandler}
          required
          name="displayName"
          type="text"
          className="field-input"
        />

        <label className="field-label">Email</label>
        <input
          onChange={onChangeHandler}
          required
          name="email"
          type="email"
          className="field-input"
        />

        <label className="field-label">Phone Number</label>
        <input
          onChange={onChangeHandler}
          required
          name="phoneNumber"
          type="text"
          className="field-input"
        />

        <label className="field-label">Country</label>
        <select
          onChange={selectCountryHandler}
          required
          type="text"
          className="field-options"
        >
          {countries &&
            countries.map((country) => <option>{country.country_name}</option>)}
        </select>

        <label className="field-label">City</label>
        <select
          onChange={selectCityHandler}
          required
          type="text"
          className="field-options"
        >
          {cities && cities.map((city) => <option>{city.state_name}</option>)}
        </select>

        <label className="field-label">Address</label>
        <input
          onChange={onChangeHandler}
          required
          name="address"
          type="text"
          className="field-input"
        />

        <label className="field-label">Password</label>
        <input
          onChange={onChangeHandler}
          required
          name="password"
          type="password"
          className="field-input"
        />

        <label className="field-label">Confirm Password</label>
        <input
          onChange={onChangeHandler}
          required
          name="confirmPassword"
          type="password"
          className="field-input"
        />
        <button className="btn btn-dark" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
