export interface IPayment {
  id: number;
  invoiceId: number;
  date: Date;
  value?: number;
}
