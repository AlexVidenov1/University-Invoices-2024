import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { Outlet, useLocation } from "react-router-dom";

type Props = {};

const RootLayout = (props: Props) => {
  const [error, setError] = useState("");
  const location = useLocation();

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

  if (error) return <div>{`PLEASE LOGIN FIRST :)`}</div>;
  return (
    <div>
      {location.pathname != "/login" && <NavBar />}
      <Outlet />
    </div>
  );
};

export default RootLayout;
