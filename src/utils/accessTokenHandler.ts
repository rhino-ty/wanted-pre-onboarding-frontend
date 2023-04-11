export const saveAccessTokenToLocalStorage = async (accessToken: string) => {
  if (typeof window !== "undefined") {
    await Promise.resolve();
    localStorage.setItem("access_token", accessToken);
  }
};

export const getAccessTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
};
