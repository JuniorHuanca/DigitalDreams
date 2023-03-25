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
    formData.append('userImage', user.image); // userImage es la clave que identifica el archivo
    formData.append('id', user.id); // Agrega el id del usuario al FormData
    return axios.patch(`/api/user/image`, { user: formData }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};