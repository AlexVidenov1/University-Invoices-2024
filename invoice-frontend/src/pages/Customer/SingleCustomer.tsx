import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const SingleCustomer = (props: Props) => {
  const { id } = useParams();
  return <div>Customer: {id}</div>;
};

export default SingleCustomer;
