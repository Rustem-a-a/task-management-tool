import {CREATE_PROJECT, GET_PROJECT} from "../actions/projectActions";
import {Project} from "../../types";
import {ProjectResponse} from "../../types/response/response";

export const initialState:ProjectResponse[] = []


const projectReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_PROJECT:
            return (
                [...action.payload]
            )
        case CREATE_PROJECT:
            console.log(action.payload)
            return (
                [...state, action.payload]
                )
            ;
        default:
            return state;
    }
};

export default projectReducer;
