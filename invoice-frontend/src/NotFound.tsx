import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 | NOT FOUND</h1>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default NotFound;
