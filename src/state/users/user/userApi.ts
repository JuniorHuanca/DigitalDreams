import axios from "axios";

export const getUserByApi = (email: string) => axios.get(`/api/user?email=${email}`)
export const updateUserByApi = (user: any) => axios.patch(`/api/user`,
    { user: user },
)
// export const updateUserImageByApi = (user: any) => axios.patch(`/api/user/image`,
//     { user: user },
//     { headers: { 'Content-Type': 'multipart/form-data' } }
// )
export const updateUserImageByApi = (user: any) => {
    const formData = new FormData();
    formData.append('userImage', user.image);
    formData.append('userId', user.id);
    return axios.patch(`/api/user/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};