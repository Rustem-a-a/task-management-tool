import $api, {API_URL} from "../http/index";
import axios from "axios";
import {AuthResponse, ProjectResponse} from "../types/response/response";
import {AxiosResponse} from "axios";
import * as cluster from "cluster";
import {ICreateProject, IEditProject} from "../types/IProject";

class ProjectService{
    static async getProject ():Promise<AxiosResponse<ProjectResponse>>{
        return  $api.get<ProjectResponse>('/project/get' )
    }
    static async createProject ({name, start, deadline}:ICreateProject):Promise<AxiosResponse<ProjectResponse>>{
        return  $api.post<ProjectResponse>('/project/create', {name, start, deadline})
    }
    static async editProject  ({_id,start, deadline}:IEditProject):Promise<AxiosResponse<ProjectResponse>>{
        return  $api.post<ProjectResponse>('/project/create', {_id,start, deadline})
    }
    static async deleteProject (_id:string):Promise<void>{
        return  $api(`/auth/logout/${_id}`)
    }

}

export default ProjectService