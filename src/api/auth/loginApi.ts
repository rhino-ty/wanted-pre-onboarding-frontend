import { saveAccessTokenToLocalStorage } from "../../utils/accessTokenHandler";
import instance from "../axiosModul";

export interface LoginRequest {
  email: string;
  password: string;
}

type LoginResult = "success" | "fail";

export const postLogin = async (args: LoginRequest): Promise<LoginResult> => {
  try {
    const loginRes = await instance.post(`/auth/signin`, args);

    saveAccessTokenToLocalStorage(loginRes.data.access_token);

    if (loginRes.status === 200) {
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
  return "fail";
  // error를 집어 넣고 catch를 사용해야 "fail"을 반환할 수 있음.. 그냥 if status하나로 안됨
};
