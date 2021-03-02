import { AxiosPromise } from 'axios';
import { instance, GetItemsType, ResponseType } from './api';


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 20) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(response => {
            return response.data
        })
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data as AxiosPromise<ResponseType>  //так как axios не возвращает ничего после запроса delete но нам нужен для TS 
        })
    },
}
