import {all} from "redux-saga/effects";
import {userWatcher} from "./userSaga";
import {projectWatcher} from "./projectSaga";
import {taskWatcher} from "./taskSaga";
import {columnWatcher} from "./columnSaga";
import {commentWatcher} from "./commentSaga";
export function* rootWatcher() {
    yield all([
        userWatcher(),
        projectWatcher(),
        taskWatcher(),
        columnWatcher(),
        commentWatcher()
    ])
}