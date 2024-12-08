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
