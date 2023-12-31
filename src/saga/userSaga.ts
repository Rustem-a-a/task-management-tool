import {put,takeEvery,call} from 'redux-saga/effects'
import AuthService from "../services/AuthService";
import {
    CHECK_AUTH_ASYNC,
    checkAuth,
    errorAction,
    login,
    LOGIN_ASYNC, logout, LOGOUT_ASYNC,
    registration,
    REGISTRATION_ASYNC, successAction,
} from "../store/actions/authActions";


function* registrationWorker (action:any){
    try{
        const {data} = yield call(AuthService.registration, action.payload)
        yield put(registration(data))
    }catch (e:any) {
        console.log(e)
        yield put(errorAction(e.response.data))
        yield put(successAction())
    }
}

function* loginWorker (action:any){
    try{
        const {data} = yield call(AuthService.login,action.payload)
        yield put(login(data))
    }catch (e:any) {
        console.log(e)
        yield put(errorAction(e.response.data))
        yield put(successAction())

    }
}

function* logoutWorker (){
    try{
        yield call(AuthService.logout)
        yield put(logout())
    }catch (e:any) {
        console.log(e)
        yield put(successAction())

    }
}

function* checkAuthWorker (){
    try{
        const {data} = yield call(AuthService.refresh)
        yield put(checkAuth(data))
    }catch (e) {
        console.log(e)
        yield put(successAction())

    }
}
export function* userWatcher(){
yield takeEvery(REGISTRATION_ASYNC,registrationWorker)
yield takeEvery(LOGIN_ASYNC,loginWorker)
yield takeEvery(LOGOUT_ASYNC,logoutWorker)
yield takeEvery(CHECK_AUTH_ASYNC,checkAuthWorker)
}