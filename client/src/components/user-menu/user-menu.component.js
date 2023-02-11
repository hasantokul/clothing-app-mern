import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./user-menu.style.scss";

export default function UserMenu() {
  const { currentUser } = useContext(UserContext);
  
  const signOutHandler = async () => {
    await signOutUser(currentUser);
    window.location.href = "/auth"
  }
  return (
    <div className="user-menu">
      {currentUser ? (
        <Fragment>
          <div className="menu-header">
            <span>Signed In as {currentUser.email}</span>
          </div>
          <ul className="user-list">
            <li className="user-item">
              <i class="fa-solid fa-basket-shopping"></i> Orders
            </li>
            <li className="user-item">
              <i class="fa-solid fa-user"></i> Information
            </li>
            <li onClick={signOutHandler} className="user-item">
              <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
            </li>
          </ul>
        </Fragment>
      ) : (
        <ul className="user-list">
          <li style={{borderTop: "none", justifyContent: "center"}} className="user-item"><Link to="/auth">Sign In</Link></li>
        </ul>
      )}
    </div>
  );
}
