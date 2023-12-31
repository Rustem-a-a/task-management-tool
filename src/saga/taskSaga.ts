import {put,takeEvery,call} from 'redux-saga/effects'
import TaskService from "../services/TaskService";
import {
    CREATE_TASK_ASYNC,
    createTask, DELETE_TASK_ASYNC,
    deleteTask, EDIT_TASK_ASYNC,
    editTask,
    GET_COLUMNS_TASK_ASYNC,
    getColumnsTask, getColumnsTaskAsync
} from "../store/actions/taskActions";
import {editColumn} from "../store/actions/columnActions";

function* getTaskWorker (action:any){
    try{
        const {data} = yield call(TaskService.getColumnsTask,action.payload)
        yield put(getColumnsTask(data))
    }catch (e) {
        console.log(e)
    }
}

function* createTaskWorker (action:any){
    try{
        const {data} = yield call(TaskService.createTask, action.payload)
        if(data.updatedTask){
            yield put(createTask(data.updatedTask))
        }
        yield put(createTask(data.newTask))
        yield put(editColumn(data.columns))

    }catch (e:any) {
        console.log(e)
    }
}

function* editTaskWorker (action:any){
    try{
        const {data} = yield call(TaskService.editTask, action.payload.editTaskData)
        yield put(editTask(data))
        yield put(getColumnsTaskAsync(action.payload.projectId))
   }catch (e:any) {
        console.log(e)
    }
}

function* deleteTaskWorker (action:any){
    try{
        const {data} = yield call(TaskService.deleteTask,action.payload)
        yield put(deleteTask(data))
    }catch (e) {
        console.log(e)
    }
}

export function* taskWatcher (){
    yield takeEvery(GET_COLUMNS_TASK_ASYNC,getTaskWorker)
    yield takeEvery(CREATE_TASK_ASYNC,createTaskWorker)
    yield takeEvery(EDIT_TASK_ASYNC,editTaskWorker)
    yield takeEvery(DELETE_TASK_ASYNC,deleteTaskWorker)
}