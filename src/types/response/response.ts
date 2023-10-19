import {IUser} from "../IUser";
import {Comment, Task} from "../../types";

export interface AuthResponse{
    refreshToken:string;
    accessToken:string;
    user: IUser
}

export interface ProjectResponse{
    _id:string;
    name:string;
    start:string
    finish: string
    deadline:string
    author:string
}

export interface ITaskResponse{
    _id: string;
    title: string;
    description: string;
    start: string;
    workTime: string;
    deadline: string;
    priority: string;
    attachments: string[];
    status: string;
    subTasks: string[];
    comments: string[];
    author:string;
}
export interface IColumnsResponse{
            id: string;
            title: string;
            taskIds: string[];
}

export interface IColumnsTaskResponse{
    columns:{[key:string]:IColumnsResponse};
    tasks: {[key:string]:ITaskResponse};
}