import { IInvoice } from "./IInvoice";

export interface ICustomer {
  id: number;
  name: string;
  surname: string;
  fullname: string;
  // title: string;
  egn: string;
  bulstat: string;
  email: string;
  phone: string;
  address: string;
  invoices?: IInvoice[];
}
