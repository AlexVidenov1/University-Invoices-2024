import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICustomer } from "../../interfaces/ICustomer";
import InvoiceTable from "../Invoice/InvoiceTable";
import {
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { getCustomerById } from "../../services/CutomerService";
import {
  createInvoice,
  getAllInvoicesForCustomer,
} from "../../services/InvoiceService";
import { IInvoice } from "../../interfaces/IInvoice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TYPE } from "../../util/commonUtils";

const SingleCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState<ICustomer>();
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<ICustomer | undefined>(
    customer
  );

  const [newInvoice, setNewInvoice] = useState({
    date: new Date(),
    due_date: new Date(),
    type: " ",
    value: " ",
    number: " ",
    comment: " ",
  });

  const [isModalCreateInvoiceOpen, setIsModalCreateInvoiceOpen] =
    useState(false);

  const fetch = async () => {
    if (id) {
      const customer = await getCustomerById(+id);
      const invoices = await getAllInvoicesForCustomer(+id);
      setCustomer(customer);
      setEditedCustomer(customer);
      setInvoices(invoices);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  if (!customer || !editedCustomer) return "Wrong customer id";

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditedCustomer({ ...customer });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalInvoice = () => {
    setIsModalCreateInvoiceOpen(true);
  };

  const handleCloseModalInvoice = () => {
    setIsModalCreateInvoiceOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({
      ...editedCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeInvoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInvoice({
      ...newInvoice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Edited customer", editedCustomer);
    // fetch();
    handleCloseModal();
  };

  const handleSubmitInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New invoice", newInvoice);
    createInvoice(customer.id, newInvoice);
    fetch();
    handleCloseModalInvoice();
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setNewInvoice({
      ...newInvoice,
      type: event.target.value,
    });
  };

  return (
    <div id="single-customer">
      <CustomerCard customer={customer} />
      <div className="crud-buttons">
        <Button variant="contained" onClick={() => handleOpenModal()}>
          Edit Customer
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenModalInvoice()}
        >
          Create Invoice
        </Button>
      </div>
      <hr />
      <div id="customer-invoices" style={{ textAlign: "center" }}>
        <h2>Customer invoices: </h2>
        <InvoiceTable invoices={invoices} />
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper-modal-form">
          <form className="edit-form" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="First Name"
              name="firstName"
              value={editedCustomer.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Middle Name"
              name="middleName"
              value={editedCustomer.middleName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editedCustomer.lastName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Title"
              name="title"
              value={editedCustomer.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="EGN"
              name="EGN"
              value={editedCustomer.EGN}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Bulstat"
              name="bulstat"
              value={editedCustomer.bulstat}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={editedCustomer.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={editedCustomer.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={editedCustomer.address}
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
        open={isModalCreateInvoiceOpen}
        onClose={handleCloseModalInvoice}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper-modal-form">
          <form className="edit-form" onSubmit={(e) => handleSubmitInvoice(e)}>
            <TextField
              required={true}
              label="Number"
              name="number"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth
              onChange={handleChangeInvoice}
            />
            <DatePicker
              label="Date"
              name="date"
              value={dayjs(newInvoice.date)}
              onChange={(newValue) => {
                if (newValue) {
                  setNewInvoice({
                    ...newInvoice,
                    date: newValue.toDate(),
                  });
                }
              }}
            />
            <DatePicker
              label="Due date"
              name="due_date"
              value={dayjs(newInvoice.due_date)}
              onChange={(newValue) => {
                if (newValue) {
                  setNewInvoice({
                    ...newInvoice,
                    due_date: newValue.toDate(),
                  });
                }
              }}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              name="Type"
              placeholder="Type"
              onChange={handleChangeType}
            >
              <MenuItem value={TYPE.EXPENSE}>{TYPE.EXPENSE}</MenuItem>
              <MenuItem value={TYPE.INCOME}>{TYPE.INCOME}</MenuItem>
            </Select>
            <TextField
              required={true}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              label="Amount"
              name="value"
              fullWidth
              onChange={handleChangeInvoice}
            />
            <TextField
              label="Comment"
              name="comment"
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
