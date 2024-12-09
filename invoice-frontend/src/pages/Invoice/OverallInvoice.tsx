import { dummyInvoices } from "../Customer/dummydata";
import InvoiceTable from "./InvoiceTable";

type Props = {};

const OverallInvoice = (props: Props) => {
  return (
    <div id="overall-invoices">
      <h1 className="title-for-page">Overall Invoices Page</h1>
      <InvoiceTable invoices={dummyInvoices} />
    </div>
  );
};

export default OverallInvoice;
