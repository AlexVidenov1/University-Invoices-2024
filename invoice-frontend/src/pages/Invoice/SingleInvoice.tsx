import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IInvoice } from "../../interfaces/IInvoice";
import { dummyInvoices } from "../Customer/dummydata";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { formatDate } from "../../util/commonUtils";

type Props = {};

const SingleInvoice = (props: Props) => {
  const { id } = useParams();

  const invoice: IInvoice | undefined = useMemo(() => {
    if (id) {
      return dummyInvoices.find((el) => el.id == parseInt(id));
    }
  }, [id]);

  console.log(invoice);
  if (!invoice) return "Wrong invoice id";

  return (
    <div id="single-invoice">
      <InvoiceCard invoice={invoice} />
    </div>
  );
};

export default SingleInvoice;

export const InvoiceCard = ({ invoice }: { invoice: IInvoice }) => {
  return (
    <div className="info-card">
      <p>
        Number: <span className="info-value">{invoice.number}</span>
      </p>
      <p>
        Created:
        <span className="info-value">{formatDate(invoice.date)}</span>
      </p>
      <p>
        Pay by:
        <span className="info-value">{formatDate(invoice.payBy)}</span>
      </p>
      <p>
        Type: <span className="info-value">{invoice.type.name}</span>
      </p>
      <p>
        Amount: <span className="info-value">{invoice.value}</span>
      </p>
      <p>
        Status: <span className="info-value">{invoice.status}</span>
      </p>
      <p>
        Comment:
        <span className="info-value">{invoice.comment || "No comment."}</span>
      </p>
    </div>
  );
};
