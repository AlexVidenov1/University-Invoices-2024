import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useEffect, useMemo } from "react";
import { ICustomer } from "../../interfaces/ICustomer";
import { dummyCustomers } from "./dummydata";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { customerColumns } from "../../util/tableUtils";
import { getAllCustomers } from "../../services/CutomerService";

type Props = {};

const OverallCustomer = (props: Props) => {
  const columns = useMemo<MRT_ColumnDef<ICustomer>[]>(
    () => customerColumns,
    []
  );

  const navigate = useNavigate();

  const customers = useMemo(() => {}, []);

  const getCustomers = async () => {
    const customersAll = await getAllCustomers();
    console.log(customersAll);
    return customersAll;
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const table = useMantineReactTable({
    columns,
    data: dummyCustomers,
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

  return (
    <div id="overall-customers">
      <h1 className="title-for-page">Overall Customers Page</h1>
      <MantineReactTable table={table} />
    </div>
  );
};

export default OverallCustomer;
