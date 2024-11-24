import axios from "axios";
import { IInvoice } from "../interfaces/IInvoice";

export async function getAllInvoices(): Promise<IInvoice[]> {
  try {
    const response = await axios.get(`/api/users`);
    return response.data as IInvoice[];
  } catch (error) {
    console.error("Error getting all invoices", error);
    throw error;
  }
}

export async function getAllInvoicesForCustomer(
  customerId: number
): Promise<IInvoice[]> {
  try {
    const response = await axios.get(`/api/users`);
    return response.data as IInvoice[];
  } catch (error) {
    console.error("Error getting all invoices for customer", error);
    throw error;
  }
}

export async function getInvoiceById(invoiceId: number): Promise<IInvoice> {
  try {
    const response = await axios.get(`/api/users`);
    return response.data as IInvoice;
  } catch (error) {
    console.error("Error getting an invoice", error);
    throw error;
  }
}
