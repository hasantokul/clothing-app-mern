import { createContext, useEffect, useState } from "react";
import {
  authStateChangeListener,
} from "../../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const unsubscribeAuthState = authStateChangeListener((user) => {
    // console.log(user)
    if (user && user.emailVerified) {
      setCurrentUser(user);
    }
  });

  useEffect(() => {
    unsubscribeAuthState();
    // console.log("auth state changed, current user: ", currentUser);
  }, [unsubscribeAuthState]);

  const value = {
    currentUser
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
