import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import { useMemo } from "react";
import { IPayment } from "../../interfaces/IPayment";
import { paymentColumns } from "../../util/tableUtils";

type PaymentsTableProps = {
  payments: IPayment[];
};

const PaymentsTable = (props: PaymentsTableProps) => {
  const columns = useMemo<MRT_ColumnDef<IPayment>[]>(
    () => paymentColumns,
    [props.payments]
  );

  const table = useMantineReactTable({
    columns,
    data: props.payments,
  });

  return <MantineReactTable table={table} />;
};

export default PaymentsTable;
