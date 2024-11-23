import { IInvoice } from "./IInvoice";

export interface ICustomer {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  EGN: string;
  bulstat: string;
  email: string;
  phone: string;
  address: string;
  // invoices?: IInvoice[]; // get from backend
}
