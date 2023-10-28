import {put,takeEvery,call} from 'redux-saga/effects'
import CommentService from "../services/CommentService";
import {
    CREATE_COMMENT_ASYNC,
    createComment,
    createCommentAsync,
    GET_COMMENTS_ASYNC,
    getComments, getCommentsAsync
} from "../store/actions/commentActions";

function* createCommentWorker (action:any){
    try{
        yield call(CommentService.createComment, action.payload)
        yield put(getCommentsAsync(action.payload.taskIdQuery))
    }catch (e:any) {
        console.log(e)
    }
}
function* getCommentsWorker (actions:any) {
    try{
        const {data} = yield call(CommentService.getComments, actions.payload)
        yield put(getComments(data))
    }catch (e:any) {
        console.log(e)
    }
}


export function* commentWatcher (){
    yield takeEvery(GET_COMMENTS_ASYNC,getCommentsWorker)
    yield takeEvery(CREATE_COMMENT_ASYNC,createCommentWorker)
}