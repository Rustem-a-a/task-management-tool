export interface IErrorResponse {
    errors:{
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
    }[];
    message:string
}