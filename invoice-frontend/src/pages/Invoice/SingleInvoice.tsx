import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { IInvoice } from "../../interfaces/IInvoice";
import { dummyInvoices } from "../Customer/dummydata";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { formatDate } from "../../util/commonUtils";
import { Button, Modal, TextField } from "@mui/material";

type Props = {};

const SingleInvoice = (props: Props) => {
  const { id } = useParams();

  const invoice: IInvoice | undefined = useMemo(() => {
    if (id) {
      return dummyInvoices.find((el) => el.id == parseInt(id));
    }
  }, [id]);

  if (!invoice) return "Wrong invoice id";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<IInvoice>(invoice);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditedInvoice({ ...invoice });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedInvoice({
      ...editedInvoice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Edited invoice", editedInvoice);
    // make edit call and reload
    handleCloseModal();
  };

  return (
    <div id="single-invoice">
      <InvoiceCard invoice={invoice} />
      <div className="crud-buttons">
        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          disabled={invoice.payments.length > 0 ? true : false}
        >
          Edit Invoice
        </Button>
        <Button variant="contained" color="success">
          Create Payment
        </Button>
      </div>

      <hr />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper-modal-form">
          <form className="edit-form" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="Number"
              name="number"
              type="number"
              disabled
              value={editedInvoice.number}
              onChange={handleChange}
              fullWidth
            />
            <DatePicker
              label="Date"
              value={dayjs(editedInvoice.date)}
              onChange={(newValue) => {
                if (newValue) {
                  setEditedInvoice({
                    ...editedInvoice,
                    date: newValue.toDate(),
                  });
                }
              }}
            />
            <DatePicker
              label="Pay By"
              value={dayjs(editedInvoice.payBy)}
              onChange={(newValue) => {
                if (newValue) {
                  setEditedInvoice({
                    ...editedInvoice,
                    date: newValue.toDate(),
                  });
                }
              }}
            />
            <TextField
              label="Status"
              name="status"
              value={editedInvoice.status}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Amount"
              name="value"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={editedInvoice.value}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Comment"
              name="comment"
              value={editedInvoice.comment}
              onChange={handleChange}
              fullWidth
            />
            {/* ... other fields for middleName, lastName, etc. ... */}
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </div>
      </Modal>
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
