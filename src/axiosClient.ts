import axios from 'axios'
import type {AxiosInstance} from 'axios'


export const AxiosClientV1: AxiosInstance = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        'ngrok-skip-browser-warning':true
    },
})

export const AxiosClientRaw: AxiosInstance = axios.create({
    baseURL: `/api`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        'ngrok-skip-browser-warning':true
    },
})

