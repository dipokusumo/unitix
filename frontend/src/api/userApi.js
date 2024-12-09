import axiosInstance from "./axiosInstance"

const login = async (email, password) => {
    const { data } = await axiosInstance.post('/user/login', { email, password })
    localStorage.setItem('token', data.data.token)
    return data
}
export const userApi = {
    login
}