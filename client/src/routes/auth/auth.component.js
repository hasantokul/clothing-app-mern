import React, { useCallback, useEffect, useState } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up-component";
import "./auth.style.scss";

export default function Auth() {
  

  return (
    <div className="auth">
        <SignIn/>
        <SignUp/>
    </div>
  );
}
