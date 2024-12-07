import axios from "axios";
import { IInvoice } from "../interfaces/IInvoice";
import { IPayment } from "../interfaces/IPayment";

export async function getAllInvoices(): Promise<IInvoice[]> {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/invoices/invoices`);
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
    const response = await axios.get(
      `http://127.0.0.1:8000/invoices/invoices/client/${customerId}`
    );
    return response.data as IInvoice[];
  } catch (error) {
    console.error("Error getting all invoices for customer", error);
    throw error;
  }
}

export async function getInvoiceById(invoiceId: number): Promise<IInvoice> {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/invoices/invoices/${invoiceId}`
    );
    return response.data as IInvoice;
  } catch (error) {
    console.error("Error getting an invoice", error);
    throw error;
  }
}

export async function getPaymentsForInvoice(
  invoiceId: number
): Promise<IPayment[]> {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/payments/payments/${invoiceId}`
    );
    return response.data as IPayment[];
  } catch (error) {
    console.error("Error getting payments", error);
    throw error;
  }
}

export async function getAllOverDueInvoices(): Promise<IInvoice[]> {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/notifications/notifications/overdue`
    );
    return response.data as IInvoice[];
  } catch (error) {
    console.error("Error getting all invoices for customer", error);
    throw error;
  }
}

export async function editInvoice(invoice: IInvoice): Promise<IInvoice> {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/invoices/invoices/${invoice.id}`,
      invoice
    );
    return response.data;
  } catch (error) {
    console.error("Error editing invoice", error);
    throw error;
  }
}
