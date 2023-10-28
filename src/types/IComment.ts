export interface ICreateComment {
    text:string;
    taskId?:string;
    parentId?:string;
    taskIdQuery:string
}