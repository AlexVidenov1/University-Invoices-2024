import axios from "axios";
import { ICustomer } from "../interfaces/ICustomer";

export async function getAllCustomers(): Promise<ICustomer[]> {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/clients/customers`);

    console.log(response);
    return response.data as ICustomer[];
  } catch (error) {
    console.error("Error getting all customers", error);
    throw error;
  }
}

export async function getCustomerById(customerId: number): Promise<ICustomer> {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/clients/customers/${customerId}`
    );
    return response.data as ICustomer;
  } catch (error) {
    console.error("Error getting a customer", error);
    throw error;
  }
}

export async function editCustomer(customer: ICustomer): Promise<ICustomer> {
  delete customer.invoices;
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/clients/customers/${customer.id}`,
      customer
    );
    return response.data;
  } catch (error) {
    console.error("Error editing customer", error);
    throw error;
  }
}

export async function createCustomer(data: any): Promise<any> {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/clients/customers`,
      { data, egn: +data.egn, bulstat: +data.bulstat }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating a customer", error);
    throw error;
  }
}
