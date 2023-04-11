import { saveAccessTokenToLocalStorage } from "../../utils/accessTokenHandler";
import instance from "../axiosModul";

export interface LoginRequest {
  email: string;
  password: string;
}

type LoginResult = "success" | "fail";

export const postLogin = async (args: LoginRequest): Promise<LoginResult> => {
  const loginRes = await instance.post(`/auth/login`, {
    body: args,
  });
  const { data: loginResponseData } = loginRes;

  saveAccessTokenToLocalStorage(loginResponseData.access_token);

  if (loginResponseData.ok) {
    return "success";
  }

  return "fail";
};
