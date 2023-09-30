import {ADD_PROJECT} from "../actions/projectActions";
import {Project} from "../../types";

export const initialState:Project[] =
    [
        {
            id:'project-1',
            name: 'First project',
            start: new Date(),
            finish:null

        },
        {
            id:'project-2',
            name: 'Second project',
            start: new Date(),
            finish:null

        }
    ]


const projectReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // case ADD_TASK:
        //     return {
        //         ...state,
        //         tasks: [...state.tasks, action.payload],
        //     };
        // case DELETE_TASK:
        //     return {
        //         ...state,
        //         tasks: state.tasks.filter((task) => task.id !== action.payload),
        //     };
        // case UPDATE_TASK:
        //     return {
        //         ...state,
        //         tasks: state.tasks.map((task) =>
        //             task.id === action.payload.id ? action.payload : task
        //         ),
        //     };
        case ADD_PROJECT:
            return (
                [...state, action.payload])
            ;
        default:
            return state;
    }
};

export default projectReducer;
