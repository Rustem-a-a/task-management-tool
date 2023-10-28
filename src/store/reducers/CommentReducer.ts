import {ICommentsResponse} from "../../types/response/response";
import {CREATE_COMMENT, GET_COMMENTS, GET_COMMENTS_ASYNC} from "../actions/commentActions";

export const initialState:ICommentsResponse[] = []


const commentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_COMMENTS:
            return ([...action.payload])
        default:
            return state;
    }
};

export default commentReducer;
