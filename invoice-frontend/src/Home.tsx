import { Button } from "@mui/material";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Welcome to <strong>Invoice Manager!</strong>
      </h1>
      <Button
        style={{ width: "200px", marginTop: "100px", textAlign: "center" }}
        variant="contained"
      >
        Log out
      </Button>
    </div>
  );
};

export default Home;
