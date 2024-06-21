

import axios, { AxiosRequestConfig } from "axios";
import { message } from "antd"
import { Navigate, useNavigate } from "react-router-dom";
// const navigate = useNavigate();
export const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
})

const enum StatusCode {
  Unauthorized = 401,
}
AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`
  return config
})


AxiosInstance.interceptors.response.use((response) => {
  return response;
}, err => {
  const errData = err.response.data;
  message.error(`${errData.statusCode}:${errData.message}`);
  if (errData.statusCode === StatusCode.Unauthorized) {
    // return navigate("/login");
  }
})


export async function requset<T = any>(config: AxiosRequestConfig) {
  return AxiosInstance.request<T>(config).then(res => res.data)
}   