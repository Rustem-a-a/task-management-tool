import axios from "../http/index";
import {AuthResponse} from "../types/response/response";
import {AxiosResponse} from "axios";

class AuthService{
    static async registration (username:string,email:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        return  axios.post<AuthResponse>('/auth/registration', {username,email,password})
    }
    static async login (username:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        return  axios.post<AuthResponse>('/auth/login', {username,password})
    }
    static async logout ():Promise<void>{
        return  axios('/auth/logout')
    }
}

export default AuthService