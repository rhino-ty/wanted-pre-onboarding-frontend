import instance from "../axiosModul";

export interface signUpRequest {
  email: string;
  password: string;
}

type signUpResult = "success" | "fail";

export const postSignUp = async (args: signUpRequest): Promise<signUpResult> => {
  const signUpRes = await instance.post(`/auth/signup`, args);

  if (signUpRes.status === 201) {
    return "success";
  }

  return "fail";
};
