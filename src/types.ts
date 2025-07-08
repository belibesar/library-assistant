export type userType = {
    email:string, username:string, name:string, password:string
}
export type NewUser = {
    email:string, password:string, name:string, username:string
}

export type CustomError = {
    message: string;
    status: number;
}