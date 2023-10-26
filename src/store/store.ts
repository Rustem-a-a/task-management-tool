// store.ts
import {applyMiddleware, createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
import projectReducer from './reducers/projectReducer'
import {Project, Types} from "../types";
import createSagaMiddleware from 'redux-saga'
import {userWatcher} from "../saga/userSaga";
import {rootWatcher} from "../saga";
import authReducer from "./reducers/authReducer";
import {IUser} from "../types/IUser";
import {IErrorResponse} from "../types/response/errorResponse";
import {IColumnsTaskResponse, ProjectResponse} from "../types/response/response";

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    tasks: taskReducer,
    projects:projectReducer,
    user:authReducer
});

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootWatcher)

export interface RootState {
    tasks: IColumnsTaskResponse;
    projects:ProjectResponse[];
    user:{
        user:IUser;
        isAuth: boolean;
        stateError: IErrorResponse;
        isLoadingAuth: boolean
    }
}

export type AppDispatch = typeof store.dispatch;
export default store;
