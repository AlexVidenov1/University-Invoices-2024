import axios from "axios";
import { IUser } from "../interfaces/IUser";

export async function login(data: IUser): Promise<any> {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
}
