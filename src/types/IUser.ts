export interface IUser{
    id: string
    username: string
    email: string
    isActivated: boolean
}


export interface IUserRegistration{
    username: string
    email: string
    password: string

}
export interface IUserLogin{
    password: string
    username: string
}
