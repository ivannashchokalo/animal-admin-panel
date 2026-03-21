import type { AuthData, User } from "../types/user";
import { api } from "./api";

export const register = async (userData: AuthData) => {
  //   console.log(userData);

  const { data } = await api.post<User>("/auth/register", userData);
  //   console.log(data);

  return data;
};

export const login = async (userData: AuthData) => {
  const { data } = await api.post<User>("/auth/login", userData);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
