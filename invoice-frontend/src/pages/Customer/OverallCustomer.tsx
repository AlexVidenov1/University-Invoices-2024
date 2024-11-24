import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useMemo } from "react";
import { ICustomer } from "../../interfaces/ICustomer";
import { dummyCustomers } from "./dummydata";
import { customerColumns } from "../../util/tableUtils";

type Props = {};

const OverallCustomer = (props: Props) => {
  const columns = useMemo<MRT_ColumnDef<ICustomer>[]>(
    () => customerColumns,
    []
  );

  const table = useMantineReactTable({
    columns,
    data: dummyCustomers,
  });

  return <MantineReactTable table={table} />;
};

export default OverallCustomer;
