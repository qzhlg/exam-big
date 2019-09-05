export interface LoginForm{
    remember: any;
    user_name: string,
    user_pwd: string
}

export enum HttpType{
    object,
    Array
}

export interface HttpInfo{
    code: number,
    messgae: string,
    data?: HttpType
}