

import axios, { AxiosRequestConfig } from "axios";
import { message } from "antd"
import { Navigate, useNavigate } from "react-router-dom";
// const navigate = useNavigate();
export const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8081",
})

const enum StatusCode {
  Unauthorized = 401,
  SERVER_ERROR = 500,
}
AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  if(config.method?.toLowerCase() == "get"){
    if(config.data){
      config.url =  config.url+'?'+ new URLSearchParams(config.data).toString()
    }
  }
  return config
})


AxiosInstance.interceptors.response.use((response) => {
  console.log(response);
  if(response.data.code !== 200){
    message.error(response.data.msg)
  }
  return response;
}, err => {
  const errData = err.response.data;
  message.error(`${errData.code}:${errData.message}`);
  if (errData.code === StatusCode.Unauthorized) {
    // return navigate("/login");
  }
})


export async function requset<T = any>(config: AxiosRequestConfig) {
  return AxiosInstance.request<T>(config).then(res => res.data)
}   