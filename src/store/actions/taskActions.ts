import {Task, Types} from "../../types";

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export const UPDATE_COLUMNS_ID = 'UPDATE_COLUMNS_ID'

export const addTask = (task: Task) => ({
    type: ADD_TASK,
    payload: task,
});

export const deleteTask = (taskId: string) => ({
    type: DELETE_TASK,
    payload: taskId,
});

export const updateTask = (task: Task) => ({
    type: UPDATE_TASK,
    payload: task,
});

export const updateColumnsId = (newData:Types) => ({
    type: UPDATE_COLUMNS_ID,
    payload:newData
})
