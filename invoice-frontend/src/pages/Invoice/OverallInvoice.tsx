import { useEffect, useState } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import { dummyInvoices } from "../Customer/dummydata";
import InvoiceTable from "./InvoiceTable";
import {
  createInvoice,
  createInvoiceForCustomer,
  getAllInvoices,
} from "../../services/InvoiceService";
import {
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { getAllCustomers } from "../../services/CutomerService";
import { ICustomer } from "../../interfaces/ICustomer";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { TYPE } from "../../util/commonUtils";

type Props = {};

const OverallInvoice = (props: Props) => {
  const [invoices, setInvoices] = useState<IInvoice[]>();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer_id: 0,
    date: new Date(),
    due_date: new Date(),
    type: " ",
    value: " ",
    number: " ",
    comment: " ",
  });

  useEffect(() => {
    fetch();
  }, [isModalOpen]);

  useEffect(() => {
    fetch();
    fetchAllCustomers();
  }, []);

  const fetch = async () => {
    const invoicesAll = await getAllInvoices();
    console.log(" all invoices: ", invoicesAll);
    setInvoices(invoicesAll);
    return invoicesAll;
  };

  const fetchAllCustomers = async () => {
    const customersAll = await getAllCustomers();
    console.log(" all customers", customersAll);
    setCustomers(customersAll);
    return customersAll;
  };

  const handleChangeInvoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInvoice({
      ...newInvoice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New invoice", newInvoice);
    createInvoiceForCustomer(newInvoice);
    setIsModalOpen(false);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setNewInvoice({
      ...newInvoice,
      type: event.target.value,
    });
  };

  const handleChangeCustomer = (event: SelectChangeEvent) => {
    setNewInvoice({
      ...newInvoice,
      customer_id: +event.target.value,
    });
  };

  useEffect(() => {
    console.log(newInvoice);
  }, [newInvoice]);

  if (!invoices) return null;
  return (
    <div id="overall-invoices">
      <h1 className="title-for-page">Overall Invoices Page</h1>
      <Button
        variant="contained"
        color="success"
        style={{ marginBottom: " 20px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Create Customer
      </Button>
      <InvoiceTable invoices={invoices} />

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper-modal-form">
          <form className="edit-form" onSubmit={(e) => handleSubmitInvoice(e)}>
            <Select
              labelId="customer-select"
              id="customer-select"
              label="Customer"
              name="Customer"
              placeholder="Customer"
              required
              onChange={handleChangeCustomer}
            >
              {customers?.map((customer) => (
                <MenuItem
                  value={customer.id}
                >{`${customer.name} ${customer.surname} ${customer.fullname}`}</MenuItem>
              ))}
            </Select>
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
              shouldDisableDate={(day) => day.isBefore(dayjs(newInvoice.date))}
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

export default OverallInvoice;
