import axios from "axios";

export const getUserByApi = (email: string) => axios.get(`/api/user?email=${email}`)
export const updateUserByApi = (user: any) => axios.patch(`/api/user`,
    { user: user },
)