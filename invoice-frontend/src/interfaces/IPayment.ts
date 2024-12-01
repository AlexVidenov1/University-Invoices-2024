export interface IPayment {
  id: number;
  invoiceId: number;
  date: Date | string;
  value: number;
}
