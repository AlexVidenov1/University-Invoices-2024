import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IInvoice } from "../../interfaces/IInvoice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { formatDate } from "../../util/commonUtils";
import { Button, Modal, TextField } from "@mui/material";
import PaymentsTable from "./PaymentsTable";
import { IPayment } from "../../interfaces/IPayment";
import {
  createPayment,
  editInvoice,
  getInvoiceById,
  getPaymentsForInvoice,
} from "../../services/InvoiceService";

type Props = {};

const SingleInvoice = (props: Props) => {
  const { id } = useParams();

  const [invoice, setInvoice] = useState<IInvoice>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState<IInvoice | undefined>(
    invoice
  );

  const [newPayment, setNewPayment] = useState({
    date: new Date(),
    amount: 0,
  });
  const [isModalCreatePaymentOpen, setIsModalCreatePaymentOpen] =
    useState(false);

  const fetch = async () => {
    if (id) {
      const invoice = await getInvoiceById(+id);
      const payments = await getPaymentsForInvoice(+id);
      invoice.payments = payments;
      setInvoice(invoice);
      setEditedInvoice(invoice);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  if (!invoice || !editedInvoice) return "Wrong invoice id";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const returnedInvoice = await editInvoice(editedInvoice);
    fetch();
    handleCloseModal();
  };

  const handleChangeInvoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPayment({
      ...newPayment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPayment(+id!, newPayment);
    fetch();
    setIsModalCreatePaymentOpen(false);
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
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsModalCreatePaymentOpen(true)}
        >
          Create Payment
        </Button>
      </div>

      <hr />
      <PaymentsTable payments={invoice.payments} />
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
              value={dayjs(editedInvoice.due_date)}
              shouldDisableDate={(day) =>
                day.isBefore(dayjs(editedInvoice.date))
              }
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

      <Modal
        open={isModalCreatePaymentOpen}
        onClose={() => setIsModalCreatePaymentOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper-modal-form">
          <form className="edit-form" onSubmit={(e) => handleSubmitPayment(e)}>
            <DatePicker
              label="Due date"
              name="due_date"
              value={dayjs(newPayment.date)}
              shouldDisableDate={(day) => day.isBefore(dayjs(invoice.date))}
              onChange={(newValue) => {
                if (newValue) {
                  setNewPayment({
                    ...newPayment,
                    date: newValue.toDate(),
                  });
                }
              }}
            />
            <TextField
              required={true}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              label="Amount"
              name="amount"
              fullWidth
              onChange={handleChangeInvoice}
            />
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
  const calculateTotalSumCovered = useCallback(
    (payments: IPayment[]) => {
      return payments.reduce((acc, cur) => (acc += cur.amount), 0);
    },
    [invoice]
  );

  const calculateOverdueDays = useCallback(
    (invoice: IInvoice) => {
      const overdueDays =
        (new Date().getTime() - new Date(invoice.due_date).getTime()) /
        (1000 * 60 * 60 * 24);

      return parseInt(overdueDays.toFixed(2));
    },
    [invoice]
  );

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
        <span className="info-value">{formatDate(invoice.due_date)}</span>
      </p>
      <p>
        Type: <span className="info-value">{invoice.type}</span>
      </p>
      <p>
        Amount: <span className="info-value">{invoice.value} lv.</span>
      </p>
      <p>
        Status: <span className="info-value">{invoice.status}</span>
      </p>
      <p>
        Comment:
        <span className="info-value">{invoice.comment || "No comment."}</span>
      </p>

      <hr />
      <p>
        Payments sum:
        <span className="info-value">
          {calculateTotalSumCovered(invoice.payments)} lv.
        </span>
      </p>
      <p>
        Remainning:
        <span className="info-value">
          {invoice.value - calculateTotalSumCovered(invoice.payments)} lv.
        </span>
      </p>
      <p>
        {calculateOverdueDays(invoice) > 0
          ? "Overdue days:"
          : "Remaining days:"}
        <span className="info-value">
          {Math.abs(calculateOverdueDays(invoice))}
        </span>
      </p>
    </div>
  );
};
