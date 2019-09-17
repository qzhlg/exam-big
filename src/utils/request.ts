import axios from 'axios';
import {AxiosResponse} from 'axios/index';
import {message} from 'antd'
import {getToken} from '@/utils/index'
// import {HttpInfo} from '@/types/index'
const Url={
  '123.206.55.50':"//exam.jasonandjay.com",
  '127.0.0.1:3000':'//169.254.19.71:7001',
  "jasonandjay.com":"//exam.jasonandjay.com"
}

const instance = axios.create({
    // baseURL: 'http://169.254.19.71:7001',
    baseURL:Url[window.location.host],
    timeout: 1000,
    headers: {'authorization':getToken()}
});

// 请求拦截器
instance.interceptors.request.use( (config: any) =>{
    // Do something before request is sent
    return config;
  }, (error: any)=> {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use( (response: AxiosResponse<any>) =>{
    // Do something with response data
    if(response.status!==200){
      message.error(response.statusText)
    }
    return response.data;
  },  (error: any) =>{
    // Do something with response error
    if(error.response.status&&error.response.status!==200){
      message.error(error.response.statusText)
    }
    return Promise.reject(error);

  }
);

export default instance;