import axiosInstance from "./axiosInstance"

const login = async (email, password) => {
    try {
        const { data } = await axiosInstance.post('/users/login', { email, password })
        localStorage.setItem('token', data.data.token)
        return data
    } catch (error) {
        throw error
    }
}
export const userApi = {
    login
}