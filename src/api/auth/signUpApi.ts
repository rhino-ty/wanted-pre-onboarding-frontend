import instance from "../axiosModul";

export interface signUpRequest {
  email: string;
  password: string;
}

type signUpResult = "success" | "fail";

export const postSignUp = async (args: signUpRequest): Promise<signUpResult> => {
  const signUpRes = await instance.post(`/auth/signup`, {
    body: args,
  });
  const { data: signUpResponseData } = signUpRes;

  if (signUpResponseData.ok) {
    return "success";
  }

  return "fail";
};
