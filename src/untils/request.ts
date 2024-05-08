import axios, { AxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';
const BASE_URL = 'https://mock.mengxuegu.com/mock/6639d9d8cab9671f88bd3226' //请求接口url 如果不配置 则默认访问链接地址
const TIME_OUT = 20000 // 接口超时时间

const request = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})

if (localStorage.getItem('token')) {
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['X-AUTH-TOKEN'] =
      'Bearer ' + token
  }

request.interceptors.request.use((config) => {
    return config
})

request.interceptors.response.use((response) => {
    if(response.status === 200) {
        return response.data
    }else if(response.status === 403) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }else {
        return response.data
    } 
},(err)=> {
    Toast.show({
        content: err.message,
        position: 'center'
    })
})

export const useRequest = async (url: string, config: AxiosRequestConfig) => {
    return await request(url, config)
}
