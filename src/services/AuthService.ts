import $api, {API_URL} from "../http/index";
import axios from "axios";
import {AuthResponse} from "../types/response/response";
import {AxiosResponse} from "axios";

class AuthService{
    static async registration ({username, email, password}:{username:string,email:string,password:string}):Promise<AxiosResponse<AuthResponse>>{
        return  $api.post<AuthResponse>('/auth/registration', {username,email,password})
    }
    static async login ({username, password}:{username:string,password:string}):Promise<AxiosResponse<AuthResponse>>{
        return  $api.post<AuthResponse>('/auth/login', {username,password})
    }
    static async logout ():Promise<void>{
        return  $api('/auth/logout')
    }
    static refresh ():Promise<AxiosResponse<AuthResponse>>{
        return  axios.get<AuthResponse>(`${API_URL}/auth/refresh`,{withCredentials:true})
    }
}

export default AuthService