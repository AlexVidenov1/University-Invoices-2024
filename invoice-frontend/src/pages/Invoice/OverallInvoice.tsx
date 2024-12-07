import { useEffect, useState } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import { dummyInvoices } from "../Customer/dummydata";
import InvoiceTable from "./InvoiceTable";
import { getAllInvoices } from "../../services/InvoiceService";

type Props = {};

const OverallInvoice = (props: Props) => {
  const [invoices, setInvoices] = useState<IInvoice[]>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const invoicesAll = await getAllInvoices();
    console.log(" all invoices: ", invoicesAll);
    setInvoices(invoicesAll);
    return invoicesAll;
  };

  if (!invoices) return null;
  return (
    <div id="overall-invoices">
      <h1 className="title-for-page">Overall Invoices Page</h1>
      <InvoiceTable invoices={invoices} />
    </div>
  );
};

export default OverallInvoice;
