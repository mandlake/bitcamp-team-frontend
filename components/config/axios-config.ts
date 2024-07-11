import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";
import {
  adminURL,
  chatURL,
  lawyerURL,
  manageURL,
  userURL,
} from "../common/url";

export const userInstance = () => {
  const instance = axios.create({ baseURL: "http://localhost:8080" });
  setInterceptor(instance);
  return instance;
};

export const lawyerInstance = () => {
  const instance = axios.create({ baseURL: "http://localhost:8081" });
  setInterceptor(instance);
  return instance;
};

export const adminInstance = () => {
  const instance = axios.create({ baseURL: "http://localhost:8082" });
  setInterceptor(instance);
  return instance;
};

export const chatInstance = () => {
  const instance = axios.create({ baseURL: "http://localhost:8083" });
  setInterceptor(instance);
  return instance;
};

export const manageInstance = () => {
  const instance = axios.create({ baseURL: "http://localhost:8084" });
  setInterceptor(instance);
  return instance;
};

export const setInterceptor = (inputInstance: AxiosInstance) => {
  inputInstance.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${parseCookies().accessToken}`;
      return config;
    },
    (error) => {
      console.log("AXIOS INTERSEPTOR ERROR OCCURED : ");
      console.log(error);
      return Promise.reject(error);
    }
  );
  inputInstance.interceptors.response.use((response) => {
    if (response.status === 404) console.log("AXIOS INTERSEPTOR CATHCES 404");

    return response;
  });
  return inputInstance;
};
