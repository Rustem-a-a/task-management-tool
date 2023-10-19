import {Comment} from "../types";

export interface ICreateTask{
    title: string;
    description?: string;
    start: string;
    workTime?: string;
    deadline: string;
    priority: string;
    projectId:string;
    parentId?:string;
}

export interface IEditTask {
    description: string;
    start: string;
    deadline: string;
    priority: string;
    status: string;
}