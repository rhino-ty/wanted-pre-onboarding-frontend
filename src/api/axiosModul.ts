import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../utils/accessTokenHandler";

export const SERVER_URL = `https://www.pre-onboarding-selection-task.shop/`;

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: !!getAccessTokenFromLocalStorage()
      ? `Bearer ${getAccessTokenFromLocalStorage()}`
      : null,
  },
});

export default instance;
