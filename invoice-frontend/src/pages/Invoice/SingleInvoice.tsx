import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const SingleInvoice = (props: Props) => {
  const { id } = useParams();
  return <div>SingleInvoice {id}</div>;
};

export default SingleInvoice;
