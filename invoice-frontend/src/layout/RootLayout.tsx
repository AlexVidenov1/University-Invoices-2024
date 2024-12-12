import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import login from "../../public/login-icon.png";
import { Button } from "@mui/material";

type Props = {};

const RootLayout = (props: Props) => {
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname != "/login") {
      console.log("Checking login...", location);
      checkLogin();
    }
  }, []);

  const checkLogin = () => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      setError(" Error logging in");
    }
  };

  if (error)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={login}
          style={{ width: "400px", height: "400px" }}
          alt="login-icon"
        />
        <h3>Please, login first!</h3>
      </div>
    );
  return (
    <div>
      {location.pathname != "/login" && <NavBar />}
      <Outlet />
    </div>
  );
};

export default RootLayout;
