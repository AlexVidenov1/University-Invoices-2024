import { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import { dummyInvoices } from "../Customer/dummydata";
import { IInvoice } from "../../interfaces/IInvoice";
import { getAllOverDueInvoices } from "../../services/InvoiceService";

type Props = {};

const OverdueInvoice = (props: Props) => {
  const [overdueInvoices, setOverdueInvoices] = useState<IInvoice[]>([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const invoices: IInvoice[] = await getAllOverDueInvoices();
    setOverdueInvoices(invoices);
  };

  return (
    <div id="overdue-invoices">
      <h1 className="title-for-page">Overdue Invoices Page</h1>
      <InvoiceTable invoices={overdueInvoices} />
    </div>
  );
};

export default OverdueInvoice;
