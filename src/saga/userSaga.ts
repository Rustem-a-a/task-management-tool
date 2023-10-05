import {put,takeEvery,call} from 'redux-saga/effects'
import AuthService from "../services/AuthService";
import {
    err,
    login,
    LOGIN_ASYNC, logout, LOGOUT_ASYNC,
    registration,
    REGISTRATION_ASYNC,
    registrationAsync
} from "../store/actions/authActions";
import {IUserRegistration} from "../types/IUser";

function* registrationWorker (action:any){
    try{
        const {data} = yield call(AuthService.registration, action.payload)
        yield put(registration(data))
    }catch (e) {
        console.log(e)

    }
}

function* loginWorker (action:any){
    try{
        const {data} = yield call(AuthService.login,action.payload)
        yield put(login(data))
    }catch (e:any) {
        yield put(err(e.response.data.message as string))
    }
}

function* logoutWorker (){
    try{
        yield call(AuthService.logout)
        yield put(logout())
    }catch (e:any) {
        console.log(e)
    }
}
export function* userWatcher(){
yield takeEvery(REGISTRATION_ASYNC,registrationWorker)
yield takeEvery(LOGIN_ASYNC,loginWorker)
yield takeEvery(LOGOUT_ASYNC,logoutWorker)
}