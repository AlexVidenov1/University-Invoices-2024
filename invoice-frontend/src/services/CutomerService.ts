import axios from "axios";
import { ICustomer } from "../interfaces/ICustomer";

export async function getAllCustomers(): Promise<ICustomer[]> {
  try {
    const response = await axios.get(`/api/users`);
    return response.data as ICustomer[];
  } catch (error) {
    console.error("Error getting all customers", error);
    throw error;
  }
}

export async function getCustomerById(customerId: number): Promise<ICustomer> {
  try {
    const response = await axios.get(`/api/users`);
    return response.data as ICustomer;
  } catch (error) {
    console.error("Error getting a customer", error);
    throw error;
  }
}
