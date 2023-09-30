// store.ts
import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
import {Project, Types} from "../types";

const rootReducer = combineReducers({
    tasks: taskReducer,
});

const store = createStore(rootReducer);

export interface RootState {
    tasks: Types;
}

export type AppDispatch = typeof store.dispatch;
export default store;
