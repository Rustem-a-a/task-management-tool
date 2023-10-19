import {put,takeEvery,call} from 'redux-saga/effects'
import ProjectService from "../services/ProjectService";
import {CREATE_PROJECT_ASYNC, createProject, GET_PROJECT_ASYNC, getProject} from "../store/actions/projectActions";

function* getProjectWorker () {
    try{
        const {data} = yield call(ProjectService.getProject)
        yield put(getProject(data))
    }catch (e:any) {
        console.log(e)
    }
}
function* createProjectWorker (action:any){
    try{
        const {data} = yield call(ProjectService.createProject, action.payload)
        yield put(createProject(data))
    }catch (e:any) {
        console.log(e)
    }
}

export function* projectWatcher (){
    yield takeEvery(GET_PROJECT_ASYNC,getProjectWorker)
    yield takeEvery(CREATE_PROJECT_ASYNC,createProjectWorker)
}