import { IPayment } from "./IPayment";

export interface IInvoice {
  id: number;
  status: string;
  customer_id: number;
  date: Date | string;
  due_date: Date | string;
  type: string;
  value: number;
  number: number;
  comment?: string;
  payments: IPayment[]; // get from backend
}
