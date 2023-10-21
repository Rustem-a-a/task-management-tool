import {IColumnsResponse} from "../../types/response/response";

export const EDIT_COLUMN = 'EDIT_COLUMN'
export const EDIT_COLUMN_ASYNC = 'EDIT_COLUMN_ASYNC'


export const editColumn = (columns:{ columns:{[key:string]:IColumnsResponse} }) => ({
    type:EDIT_COLUMN,
    payload:columns
})
export const editColumnAsync = (projectId:string,columns:{ columns:{[key:string]:IColumnsResponse} }) => ({
    type:EDIT_COLUMN_ASYNC,
    payload:{projectId,...columns}
})