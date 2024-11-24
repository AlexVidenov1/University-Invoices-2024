import { IPayment } from "./IPayment";
import { IType } from "./IType";

export interface IInvoice {
  id: number;
  customerId: number;
  number: number;
  date: Date | string;
  type?: IType;
  payBy: Date | string;
  status: string;
  value: string;
  comment?: string;
  payments?: IPayment[]; // get from backend
}
