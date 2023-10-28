import $api from "../http/index";
import {AxiosResponse} from "axios";
import {ICommentsResponse} from "../types/response/response";
import {ICreateComment} from "../types/IComment";

class CommentService{
    static async getComments (taskId:string):Promise<AxiosResponse<ICommentsResponse[]>>{
        return  $api.get<ICommentsResponse[]>('/comment/get/'+taskId )
    }
    static async createComment (createdCommentData:ICreateComment):Promise<AxiosResponse<ICommentsResponse>>{
        return  $api.post<ICommentsResponse>('/comment/create', createdCommentData)
    }
}

export default CommentService