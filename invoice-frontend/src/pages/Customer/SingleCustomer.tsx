import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyCustomers, dummyInvoices } from "./dummydata";
import { ICustomer } from "../../interfaces/ICustomer";
import InvoiceTable from "../Invoice/InvoiceTable";

type Props = {};

const SingleCustomer = (props: Props) => {
  const { id } = useParams();
  const customer: ICustomer | undefined = useMemo(() => {
    if (id) {
      return dummyCustomers.find((el) => el.id == parseInt(id));
    }
  }, [id]);

  const invoices = useMemo(() => {
    console.log(" dummyInvoice", dummyInvoices);
    // fetch for customer invoices
    return dummyInvoices.filter(
      (invoice) => invoice.customerId == customer?.id
    );
  }, [customer]);

  useEffect(() => {});

  return (
    <div id="single-customer">
      <CustomerCard customer={customer} />
      <hr />
      <div id="customer-invoices" style={{ textAlign: "center" }}>
        <h2>Customer invoices: </h2>
        <InvoiceTable invoices={invoices} />
      </div>
    </div>
  );
};

export default SingleCustomer;

const CustomerCard = ({ customer }: { customer: ICustomer | undefined }) => {
  return (
    <div className="info-card">
      <p>
        First Name: <span className="info-value">{customer?.firstName}</span>
      </p>
      <p>
        Middle Name: <span className="info-value">{customer?.middleName}</span>
      </p>
      <p>
        Last Name: <span className="info-value">{customer?.lastName}</span>
      </p>
      <p>
        Title: <span className="info-value">{customer?.title}</span>
      </p>
      <p>
        EGN: <span className="info-value">{customer?.EGN}</span>
      </p>
      <p>
        Bulstat: <span className="info-value">{customer?.bulstat}</span>
      </p>
      <p>
        Email: <span className="info-value">{customer?.email}</span>
      </p>
      <p>
        Phone: <span className="info-value">{customer?.phone}</span>
      </p>
      <p>
        Address: <span className="info-value">{customer?.address}</span>
      </p>
    </div>
  );
};
