import { async } from "@firebase/util";
import React, { useState } from "react";
import { signInUser, signInWithGoogle } from "../../utils/firebase/firebase.utils";
import "./sign-in.style.scss";
export default function SignIn() {
  const defaultFormFileds = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFileds);

  const onChangeHandler = (e) => {
    const {name, value} = e.target
    setFormFields({...formFields, [name]: value});
  }

  const {email, password} = formFields;

  const onSubmitHandler = async (e) => {
    console.log("submit fired");
    e.preventDefault();
    await signInUser(email, password);
  }

  const googleSignInHandler = async (e) => {
    e.preventDefault();
    await signInWithGoogle().then((result) => {
      console.log(result, "google signin successfull");
      window.location.href = "/";
    });

  }

  
  return (
    <div className="sign-in-container">
      <h2 className="from-title">Already Have an Account ? Sign In</h2>
      <form onSubmit={onSubmitHandler} className="form">
        <label className="field-label">Email</label>
        <input onChange={onChangeHandler} required name="email" type="email" className="field-input" />

        <label className="field-label">Password</label>
        <input onChange={onChangeHandler} required name="password" type="password" className="field-input" />
        <div className="btn-group">
          <button className="btn btn-dark" type="submit">Sign In</button>
          <button onClick={googleSignInHandler} className="btn btn-blue">Sign In with Google</button>
        </div>
      </form>
    </div>
  );
}
