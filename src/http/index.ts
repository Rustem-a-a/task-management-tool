import axios from "axios";
import AuthService from "../services/AuthService";

export const API_URL = 'http://localhost:4000'

const $api = axios.create({
    withCredentials:true,
    baseURL:API_URL
})

$api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`
    return config
})

$api.interceptors.response.use(config => {
    return config
},async (error) => {
    const originalRequest = error.config
    if(error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try{
            const {data} = await AuthService.refresh()
            localStorage.setItem('token',data.accessToken)
            return $api.request(originalRequest)
        }catch (e:any){
            console.log('Do not authorized')
        }
    }
    throw error;
})

export default $api