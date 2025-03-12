import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState(localStorage.getItem("user"));

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("user", user);
    setTokenState(newToken);
  };

  return (
    <>
      <NavBar token={token} setToken={setToken} user={user} setUser={setUser} />
      <ApplicationViews
        token={token}
        setToken={setToken}
        user={user}
        setUser={setUser}
      />
    </>
  );
};
