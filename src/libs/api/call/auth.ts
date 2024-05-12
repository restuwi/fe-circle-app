import API from "..";
import { IAuthLogin, IAuthRegister } from "../../../types/app";

export const APILogin = async (body: IAuthLogin) => {
  return await API.post("login", body);
};

export const APIRegister = async (body: IAuthRegister) => {
  return await API.post("register", body);
};

export const AuthCheck = async (token: string) => {
  return await API.get("/check", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const APIForgotPassword = async (email: string) => {
  return await API.post("forgot-password", { email });
};
