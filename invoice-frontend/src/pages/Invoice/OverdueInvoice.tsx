import { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import { dummyInvoices } from "../Customer/dummydata";
import { IInvoice } from "../../interfaces/IInvoice";

type Props = {};

const OverdueInvoice = (props: Props) => {
  const [overdueInvoices, setOverdueInvoices] = useState<IInvoice[]>([]);
  useEffect(() => {
    //fetch all invoices
    const invoices = dummyInvoices;

    const filteredInvoices = invoices.filter((invoice) => {
      const payByDate = new Date(invoice.payBy);
      const today = new Date();
      return payByDate < today;
    });

    setOverdueInvoices(filteredInvoices);
  }, []);

  return (
    <div id="overdue-invoices">
      <h1 className="title-for-page">Overdue Invoices Page</h1>
      <InvoiceTable invoices={overdueInvoices} />
    </div>
  );
};

export default OverdueInvoice;
