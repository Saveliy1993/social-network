import axios from "axios"
import { UserType } from "../types/types"


export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: { 'API-KEY': 'bee480e3-0f98-4392-8f63-0928cd74c901' },
})


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type ResponseType<D = {}, RC = ResultCodesEnum > = {
    data: D
    resultCode: RC
    messages: Array<string>
}

