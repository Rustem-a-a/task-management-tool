import {Project} from "../../types";
import {ProjectResponse} from "../../types/response/response";
import {ICreateProject} from "../../types/IProject";

export const GET_PROJECT = 'GET_PROJECT';
export const GET_PROJECT_ASYNC = 'GET_PROJECT_ASYNC';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const CREATE_PROJECT_ASYNC = 'CREATE_PROJECT_ASYNC';
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';


export const getProject = (projects:ProjectResponse[]) => (
    {
        type: GET_PROJECT,
        payload:projects
    }
    )
export const getProjectAsync = () => ({
    type: GET_PROJECT_ASYNC
    }
    )
export const createProject = (createdProjectData: ProjectResponse[]) => ({
    type: CREATE_PROJECT,
    payload: createdProjectData,
});
export const createProjectAsync = (createProjectData: ICreateProject) => ({
    type: CREATE_PROJECT_ASYNC,
    payload: createProjectData,
});
export const deleteProject = (id: string) => ({
    type: DELETE_PROJECT,
    payload: id,
});
export const updateProject = (project: Project) => ({
    type: EDIT_PROJECT,
    payload: project,
});