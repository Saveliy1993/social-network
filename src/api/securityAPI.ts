import { instance } from './api';

type SecurityAPIResponsetype = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<SecurityAPIResponsetype>(`security/get-captcha-url`)
    },
}
