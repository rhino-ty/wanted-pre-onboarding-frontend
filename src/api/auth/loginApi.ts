import instance from "../axiosModul";

export const postLogin = async (email: string, password: string) => {
  const response = await instance.post("/auth/signin", { email, password });
  return response.data;
};
