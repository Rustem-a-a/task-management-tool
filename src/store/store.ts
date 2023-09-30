// store.ts
import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
import projectReducer from './reducers/projectReducer'
import {Project, Types} from "../types";

const rootReducer = combineReducers({
    tasks: taskReducer,
    projects:projectReducer
});

const store = createStore(rootReducer);

export interface RootState {
    tasks: Types;
    projects:Project[]
}

export type AppDispatch = typeof store.dispatch;
export default store;
