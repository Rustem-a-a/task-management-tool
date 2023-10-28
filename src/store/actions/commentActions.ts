import {ICommentsResponse} from "../../types/response/response";
import {ICreateComment} from "../../types/IComment";

export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_ASYNC = 'GET_COMMENTS_ASYNC';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_ASYNC = 'CREATE_COMMENT_ASYNC';
export const getComments = (comments: ICommentsResponse[]) => (
    {
        type: GET_COMMENTS,
        payload: comments
    }
)
export const getCommentsAsync = (taskId: string) => (
    {
        type: GET_COMMENTS_ASYNC,
        payload: taskId
    }
)
export const createComment = (createdComment: ICommentsResponse) => (
    {
        type: CREATE_COMMENT,
        payload: createdComment,
    }
);
export const createCommentAsync = (createdCommentsData: ICreateComment) => (
    {
        type: CREATE_COMMENT_ASYNC,
        payload: createdCommentsData,
    }
);
