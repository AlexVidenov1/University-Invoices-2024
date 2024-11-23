import React from "react";
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
