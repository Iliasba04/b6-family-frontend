export interface IUser{
    _id:string,
    firstname:string,
    lastname:string

    role:string,
    username:string,
    password?:string,

    token?:string,
    active?:boolean
}