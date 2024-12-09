import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyCustomers, dummyInvoices } from "./dummydata";
import { ICustomer } from "../../interfaces/ICustomer";
import InvoiceTable from "../Invoice/InvoiceTable";
import { Button, Modal, TextField } from "@mui/material";

type Props = {};

const SingleCustomer = (props: Props) => {
  const { id } = useParams();
  const customer: ICustomer | undefined = useMemo(() => {
    if (id) {
      return dummyCustomers.find((el) => el.id == parseInt(id));
    }
  }, [id]);

  if (!customer) return "Wrong customer id";

  const invoices = useMemo(() => {
    console.log(" dummyInvoice", dummyInvoices);
    // fetch for customer invoices
    return dummyInvoices.filter(
      (invoice) => invoice.customerId == customer?.id
    );
  }, [customer]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<ICustomer>(customer);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditedCustomer({ ...customer });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({
      ...editedCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Edited customer", editedCustomer);
    // make edit call and reload
    handleCloseModal();
  };

  return (
    <div id="single-customer">
      <CustomerCard customer={customer} />
      <div className="crud-buttons">
        <Button variant="contained" onClick={() => handleOpenModal()}>
          Edit Customer
        </Button>
        <Button variant="contained" color="success">
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
