import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ICustomer } from "../../interfaces/ICustomer";
import { dummyCustomers } from "./dummydata";
import { Button, Modal, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { customerColumns } from "../../util/tableUtils";
import { createCustomer, getAllCustomers } from "../../services/CutomerService";

type Props = {};

const OverallCustomer = (props: Props) => {
  const columns = useMemo<MRT_ColumnDef<ICustomer>[]>(
    () => customerColumns,
    []
  );

  const navigate = useNavigate();

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    surname: " ",
    fullname: " ",
    egn: " ",
    bulstat: " ",
    email: " ",
    phone: " ",
    address: " ",
  });

  useEffect(() => {
    fetch();
  }, [isModalOpen]);

  const fetch = async () => {
    const customersAll = await getAllCustomers();
    console.log(" all customers", customersAll);
    setCustomers(customersAll);
    return customersAll;
  };

  const table = useMantineReactTable({
    columns,
    data: customers,
    // enableRowSelection: true,
    // renderTopToolbar: ({ table }) => {
    //   const handleDelete = () => {
    //     // table.getSelectedRowModel().flatRows.map((row) => {
    //     //   alert("deactivating " + row.getValue("name"));
    //     // });
    //     console.log(table.getSelectedRowModel().flatRows);
    //   };
    //   return (
    //     <Button
    //       onClick={() => handleDelete()}
    //       variant="contained"
    //       color="error"
    //     >
    //       Delete
    //     </Button>
    //   );
    // },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        const customer: ICustomer = row.original;
        navigate(`/customers/${customer.id}`);
      },
      sx: {
        cursor: "pointer",
      },
    }),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCustomer(newCustomer);
    setIsModalOpen(false);
  };

  return (
    <div id="overall-customers">
      <h1 className="title-for-page">Overall Customers Page</h1>
      <Button
        variant="contained"
        color="success"
        style={{ marginBottom: " 20px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Create Customer
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper-modal-form">
          <form className="edit-form" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="First Name"
              name="name"
              required
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Middle Name"
              name="surname"
              required
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="fullname"
              required
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="EGN"
              name="egn"
              type="number"
              required
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Bulstat"
              name="bulstat"
              type="number"
              required
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              required
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              type="number"
              name="phone"
              required
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              required
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
      <MantineReactTable table={table} />
    </div>
  );
};

export default OverallCustomer;
