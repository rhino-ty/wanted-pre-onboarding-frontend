export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", accessToken);
  }
};

export const getAccessTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
};
