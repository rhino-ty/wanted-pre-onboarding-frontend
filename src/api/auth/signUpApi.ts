import instance from "../axiosModul";

export const postSignUp = async (email: string, password: string) => {
  const response = await instance.post("/auth/signup", { email, password });
  return response.data;
};
