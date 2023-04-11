import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../utils/accessTokenHandler";

const SERVER_URL = "https://www.pre-onboarding-selection-task.shop/";

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessTokenFromLocalStorage() || ""}`,
  },
});

export default instance;
