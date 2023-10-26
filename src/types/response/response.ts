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
    subtasks: string[];
    comments: string[];
    author:string;
    child:boolean;
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

export interface ICommentsResponse{
    text:string;
    author: string;
    createdAt: string;
    subcomments: string;

}