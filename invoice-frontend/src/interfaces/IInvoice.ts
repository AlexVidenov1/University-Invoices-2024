import { IPayment } from "./IPayment";
import { IType } from "./IType";

export interface IInvoice {
  id: number;
  customerId: number;
  number: number;
  date: Date;
  type: IType;
  payBy: Date;
  status: string;
  value: string;
  comment?: string;
  payments: IPayment[]; // get from backend
}
