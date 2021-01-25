import * as axios from "axios"


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: { 'API-KEY': 'bee480e3-0f98-4392-8f63-0928cd74c901' },
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 20) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data
        })
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data
        })
    },
    getProfile(userId) {
        console.warn('USE profileAPI')
        return profileAPI.getProfile(userId)
    },
}
export const profileAPI = {
    getProfile(userId = 13827) {
        return instance.get(`profile/` + userId).then(response => {
            return response.data
        })
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId).then(response => {
            return response.data
        })
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status }).then(response => {
            return response.data
        })
    },
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}