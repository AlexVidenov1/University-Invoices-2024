import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

interface RouteError {
  message: string;
  statusCode?: number;
  // Add more properties as needed
}

type Props = {};

const Error = (props: Props) => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();
  if (error) {
    return (
      <div>
        <h3>An error occurred.</h3>
        <p>Error: {error.message}</p>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    );
  }
  return null;
};

export default Error;
