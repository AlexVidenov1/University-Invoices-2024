export interface IPayment {
  id: number;
  invoice_id: number;
  date: Date | string;
  amount: number;
}
