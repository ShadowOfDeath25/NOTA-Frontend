import axios from 'axios'
import type {AxiosInstance} from 'axios'


export const AxiosClientV1: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json"
    },
})


