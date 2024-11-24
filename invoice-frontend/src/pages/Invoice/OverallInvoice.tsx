import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useMemo } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import { invoiceColumns } from "../../util/tableUtils";
import { dummyInvoices } from "../Customer/dummydata";

type Props = {};

const OverallInvoice = (props: Props) => {
  const columns = useMemo<MRT_ColumnDef<IInvoice>[]>(() => invoiceColumns, []);

  const table = useMantineReactTable({
    columns,
    data: dummyInvoices,
  });

  return <MantineReactTable table={table} />;
};

export default OverallInvoice;
