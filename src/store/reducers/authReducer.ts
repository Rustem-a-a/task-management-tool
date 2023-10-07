import {ADD_PROJECT} from "../actions/projectActions";
import {Project} from "../../types";
import {IUser} from "../../types/IUser";
import {CHECK_AUTH, ERR, LOGIN, LOGOUT, REGISTRATION} from "../actions/authActions";
import {IErrorResponse} from "../../types/response/errorResponse";

interface IInitialState{
    user:IUser;
    isAuth: boolean;
    stateError:IErrorResponse
}
export const initialState:IInitialState = {
    user: {} as IUser,
    isAuth : false,
    stateError: {} as IErrorResponse
}


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
            case REGISTRATION:
                localStorage.setItem('token',action.payload.accessToken)
                return (
                {...state, isAuth:true, user:action.payload, stateError:{} as IErrorResponse});

            case LOGIN:
                localStorage.setItem('token',action.payload.accessToken)
            return (
                {...state, isAuth:true, user:action.payload, stateError: {} as IErrorResponse});

            case LOGOUT:
                localStorage.removeItem('token')
            return (
                {...state, isAuth:false, user: {} as IUser});

            case ERR:
                console.log(action.payload)
            return (
                {...state, stateError:action.payload});

            case CHECK_AUTH:
                localStorage.setItem('token',action.payload.accessToken)
                return (
                {...state,isAuth:true, user:action.payload, stateError: {} as IErrorResponse}
                )

        default:
            return state;
    }
};

export default authReducer;
