import {Project} from "../../types";

export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';

export const addProject = (project:Project) => ({
    type: ADD_PROJECT,
    payload: project,
});
export const deleteProject = (id:string) => ({
    type: DELETE_PROJECT,
    payload: id,
});
export const updateProject = (project:Project) => ({
    type: UPDATE_PROJECT,
    payload: project,
});