import {put,takeEvery,call} from 'redux-saga/effects'
import {EDIT_COLUMN_ASYNC, editColumn} from "../store/actions/columnActions";
import ColumnService from '../services/сolumnService';

function* editColumnWorker (action:any){
    try{
        console.log(action.payload)
        const {data} = yield call(ColumnService.editColumn, action.payload)
        console.log(data)
        yield put(editColumn(data))
    }catch (e:any) {
        console.log(e)
    }
}
export function* columnWatcher (){
    yield takeEvery(EDIT_COLUMN_ASYNC,editColumnWorker)

}