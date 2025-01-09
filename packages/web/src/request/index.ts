

import axios, { AxiosRequestConfig } from "axios";
import { message } from "antd"
import { useSelector, useDispatch } from 'react-redux'
// const navigate = useNavigate();
import { setToken } from '../store/userSlice'

export const AxiosInstance = axios.create({
  baseURL: "http://1.94.207.116:8081",
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
    // return navigate("/login");
    message.error(response.data.msg)
  }
  return response;
}, err => {
  const errData = err.response.data;
  message.error(`${errData.code}:${errData.message}`);
  if (errData.code === StatusCode.Unauthorized) {
    localStorage.setItem('token', '');
    window.location.href = '/login';
    return;
  }
})


export async function requset<T = any>(config: AxiosRequestConfig) {
  return AxiosInstance.request<T>(config).then(res => res.data)
}   