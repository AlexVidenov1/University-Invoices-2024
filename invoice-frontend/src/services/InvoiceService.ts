import axios from "axios";
import { IInvoice } from "../interfaces/IInvoice";
import { IPayment } from "../interfaces/IPayment";
import { formatDateForInvoiceCreation, STATUS } from "../util/commonUtils";

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

export async function createInvoice(
  customerId: number,
  data: any
): Promise<any> {
  try {
    const finalPayload = {
      customer_id: customerId,
      status: STATUS.UNPAID,
      ...data,
      date: formatDateForInvoiceCreation(data.date),
      due_date: formatDateForInvoiceCreation(data.due_date),
    };

    console.log("final", finalPayload);
    const response = await axios.post(
      `http://127.0.0.1:8000/invoices/invoices`,
      finalPayload
    );
    return response.data;
  } catch (error) {
    console.error("Error getting a customer", error);
    throw error;
  }
}

export async function createPayment(
  invoiceId: number,
  data: any
): Promise<any> {
  try {
    const finalPayload = {
      invoice_id: invoiceId,
      amount: +data.amount,
      date: formatDateForInvoiceCreation(data.date),
    };

    const response = await axios.post(
      `http://127.0.0.1:8000/payments/payments/invoices/${invoiceId}/payments`,
      finalPayload
    );
    return response.data;
  } catch (error) {
    console.error("Error createing a payment", error);
    throw error;
  }
}
