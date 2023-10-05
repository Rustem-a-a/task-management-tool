import {ADD_PROJECT} from "../actions/projectActions";
import {Project} from "../../types";
import {IUser} from "../../types/IUser";
import {ERR, LOGIN, LOGOUT, REGISTRATION} from "../actions/authActions";

interface IInitialState{
    user:IUser;
    isAuth: boolean;
    err:string
}
export const initialState:IInitialState = {
    user: {} as IUser,
    isAuth : false,
    err: ''
}


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
            case REGISTRATION:
            return (
                {...state, isAuth:true, user:action.payload});

            case LOGIN:
            return (
                {...state, isAuth:true, user:action.payload});

            case LOGOUT:
            return (
                {...state, isAuth:false, user: {} as IUser});
            case ERR:
            return (
                {...state, err:action.payload});

        default:
            return state;
    }
};

export default authReducer;
