import {CREATE_TASK, EDIT_COLUMN, GET_COLUMNS_TASK} from '../actions/taskActions';
import {IColumnsTaskResponse} from "../../types/response/response";

export const initialState: IColumnsTaskResponse = {
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Queue',
            taskIds: []
        },
        'column-2': {
            id: 'column-2',
            title: 'Development',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        }
    },
    tasks: {}
}

const taskReducer = (state=initialState,action:any) =>{
    switch (action.type){
        case GET_COLUMNS_TASK:
            return ({...action.payload})
        case CREATE_TASK:
            return ({...state,tasks:{...state.tasks,...action.payload}})
        case EDIT_COLUMN:
            console.log(action.payload)
            return (
                {...state,columns:action.payload.columns}
            )
        default:
            return state
    }
}

export default taskReducer;
