import axios from 'axios'
import type {AxiosInstance} from 'axios'


export const AxiosClientV1: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json"
    },
})


