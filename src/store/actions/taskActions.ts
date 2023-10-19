import {IColumnsResponse, IColumnsTaskResponse, ITaskResponse} from "../../types/response/response";
import {ICreateTask, IEditTask} from "../../types/ITask";
import {CREATE_PROJECT_ASYNC} from "./projectActions";

export const GET_COLUMNS_TASK = 'GET_COLUMNS_TASK'
export const GET_COLUMNS_TASK_ASYNC = 'GET_COLUMNS_TASK_ASYNC'
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_ASYNC = 'CREATE_TASK';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_ASYNC = 'DELETE_TASK_ASYNC';

export const EDIT_TASK = 'EDIT_TASK';
export const EDIT_TASK_ASYNC = 'EDIT_TASK_ASYNC';

export const EDIT_COLUMN = 'EDIT_COLUMN'
export const EDIT_COLUMN_ASYNC = 'EDIT_COLUMN_ASYNC'

export const EDIT_COLUMNS_TASK_IDS = 'EDIT_COLUMNS_TASK_IDS'
export const EDIT_COLUMNS_TASK_IDS_ASYNC = 'EDIT_COLUMNS_TASK_IDS_ASYNC'

export const getColumnsTask = (columnsTaskResponse:{columns:IColumnsTaskResponse}) => ({
    type: GET_COLUMNS_TASK,
    payload:columnsTaskResponse
})
export const getColumnsTaskAsync = (dataToGetColumnsTasks:string) => ({
    type: GET_COLUMNS_TASK_ASYNC,
    payload:dataToGetColumnsTasks
})
export const createTask = (createdTask: ITaskResponse) => ({
    type: CREATE_TASK,
    payload: createdTask,
});

export const createTaskAsync = (createTaskData: ICreateTask) => ({
    type: CREATE_TASK_ASYNC,
    payload: createTaskData,
});


export const editTask = (editedTask: ITaskResponse) => ({
    type: EDIT_TASK,
    payload: editedTask,
});
export const editTaskAsync = (editTaskData: IEditTask) => ({
    type: EDIT_TASK_ASYNC,
    payload: editTaskData,
});

export const editColumn = (columns:{ columns:{[key:string]:IColumnsResponse} }) => ({
    type:EDIT_COLUMN,
    payload:columns
})
export const editColumnAsync = (projectId:string,columns:{ columns:{[key:string]:IColumnsResponse} }) => ({
    type:EDIT_COLUMN_ASYNC,
    payload:{projectId,...columns}
})

export const deleteTask = (deletedTask: ITaskResponse) => ({
    type: DELETE_TASK,
    payload: deletedTask,
});export const deleteTaskAsync = (deleteTaskData:{projectId:string, taskId:string,parentId: string}) => ({
    type: DELETE_TASK_ASYNC,
    payload: deleteTaskData,
});

