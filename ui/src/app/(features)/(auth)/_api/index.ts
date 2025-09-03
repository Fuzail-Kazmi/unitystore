import axios from "axios";
import { API_URL } from "@/app/_api";

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (body: LoginBody): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/api/login`, body);
  return response.data;
};

export const registerUser = async (body: {name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/api/register`, body);
  return response.data;
};

export const refreshAccessTokenFn = async (refresh: string): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/api/login/refresh`, { refresh });
  return response.data;
};
