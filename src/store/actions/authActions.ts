import {IUser, IUserLogin, IUserRegistration} from "../../types/IUser";
import {AuthResponse} from "../../types/response/response";

export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_ASYNC = 'REGISTRATION_ASYNC';
export const LOGIN = 'LOGIN';
export const LOGIN_ASYNC = 'LOGIN_ASYNC';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_ASYNC = 'LOGOUT_ASYNC';
export const ERR = 'ERR';

export const registration = (userData:AuthResponse) => ({
    type: REGISTRATION,
    payload: userData,
});
export const registrationAsync = (userData:IUserRegistration) => ({
    type: REGISTRATION_ASYNC,
    payload: userData,
});

export const login = (userData:AuthResponse) => ({
    type: LOGIN,
    payload: userData,
});

export const loginAsync = (userData:IUserLogin) => ({
    type: LOGIN_ASYNC,
    payload: userData,
});
export const logout = () => ({
    type: LOGOUT,
});export const logoutAsync = () => ({
    type: LOGOUT_ASYNC,
});
export const err = (errData:string) => ({
    type: ERR,
    payload:errData
});

