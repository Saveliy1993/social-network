import { ProfileType, PhotosType } from './../types/types';
import { instance, ResponseType } from './api';

type SaveResponsePhotosType = { photos: PhotosType }
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => {
            return response.data
        })
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, { status: status }).then(response => {
            return response.data
        })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<SaveResponsePhotosType>>(`profile/photo`, formData)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
    },
}
