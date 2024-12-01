import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { IInvoice } from "../../interfaces/IInvoice";
import { useNavigate } from "react-router-dom";
import { invoiceColumns } from "../../util/tableUtils";

type InvoiceTable = {
  invoices: IInvoice[];
};

const InvoiceTable = (props: InvoiceTable) => {
  const navigate = useNavigate();

  const columns = useMemo<MRT_ColumnDef<IInvoice>[]>(() => invoiceColumns, []);

  const table = useMantineReactTable({
    columns,
    data: props.invoices,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        const invoice: IInvoice = row.original;
        navigate(`/invoices/${invoice.id}`);
      },
      sx: {
        cursor: "pointer",
      },
    }),
  });

  return <MantineReactTable table={table} />;
};

export default InvoiceTable;
