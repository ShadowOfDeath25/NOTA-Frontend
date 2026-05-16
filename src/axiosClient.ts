import axios from 'axios'
import type {AxiosInstance} from 'axios'


export const AxiosClientV1: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        'ngrok-skip-browser-warning':true
    },
})

export const AxiosClientRaw: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        'ngrok-skip-browser-warning':true
    },
})

