import { instance, ResponseType, ResultCodesEnum, ResultCodeForCaptcha } from './api';

type MeResponseType = { id: number, login: string, email: string }
type LoginResponseType = { userId: number }

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
