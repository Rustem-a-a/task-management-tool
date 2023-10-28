import {IUser} from "../../types/IUser";
import {CHECK_AUTH, ERR, LOGIN, LOGOUT, REGISTRATION, SUCCESS} from "../actions/authActions";
import {IErrorResponse} from "../../types/response/errorResponse";

interface IInitialState {
    user: IUser;
    isAuth: boolean;
    stateError: IErrorResponse,
    isLoadingAuth: boolean
}

export const initialState: IInitialState = {
    user: {
        id: '',
        username: '',
        email: '',
        isActivated: false
    },
    isAuth: false,
    isLoadingAuth: true,
    stateError: {} as IErrorResponse,
}


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTRATION:
            localStorage.setItem('token', action.payload.accessToken)
            return (
                {
                    ...state,
                    isAuth: true,
                    user: {...action.payload.user},
                    isLoadingAuth: true,
                    stateError: {} as IErrorResponse
                });

        case LOGIN:
            localStorage.setItem('token', action.payload.accessToken)
            return (
                {
                    ...state,
                    isAuth: true,
                    user: action.payload.user,
                    isLoadingAuth: false,
                    stateError: {} as IErrorResponse
                });

        case LOGOUT:
            localStorage.removeItem('token')
            return (
                {...state, isAuth: false, isLoadingAuth: false, user: {} as IUser});

        case ERR:
            return (
                {...state, isLoadingAuth: false, stateError: action.payload});

        case CHECK_AUTH:
            localStorage.setItem('token', action.payload.accessToken)
            return (
                {...state, isAuth: true, user: action.payload.user, isLoadingAuth: false, stateError: {} as IErrorResponse}
            )

        case SUCCESS:
            return {...state, isLoadingAuth: false};

        default:
            return state;
    }
};

export default authReducer;