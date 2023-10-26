import $api from "../http";
import {AxiosResponse} from "axios";
import {IColumnsTaskResponse, ITaskResponse, ProjectResponse} from "../types/response/response";
import {ICreateTask, IEditTask} from "../types/ITask";
import {deleteTask, editTask} from "../store/actions/taskActions";

class TaskService{
    static async  getColumnsTask (projectId:string):Promise<AxiosResponse<IColumnsTaskResponse>>{
        return $api.get<IColumnsTaskResponse>(`/task/get/${projectId}`)
    }

    static async createTask (createTaskData:ICreateTask):Promise<AxiosResponse<ITaskResponse>>{
        return  $api.post<ITaskResponse>('/task/create', createTaskData)

    }

    static async editTask (editTaskData: IEditTask):Promise<AxiosResponse<ITaskResponse>>{
        return  $api.patch<ITaskResponse>('/task/edit', editTaskData)

    }
    static async deleteTask (deleteTaskData:{projectId:string, taskId:string,parentId: string}):Promise<AxiosResponse<ITaskResponse>>{
        return  $api.get<ITaskResponse>(`/task/delete/${deleteTaskData.projectId}/${deleteTaskData.parentId}/${deleteTaskData.taskId}`)

    }

}

export default TaskService