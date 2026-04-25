import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {AxiosClientV1, AxiosClientRaw} from "../../axiosClient.ts";
import type {User} from "@customTypes/User.ts";
import {type LoginCredentials} from '@customTypes/LoginCredentials.ts'
import {AxiosError} from "axios"
import type {APIValidationError} from "@customTypes/APIValidationError.ts";

interface LoginResponse {
    user: User
}

export const useAuth = () => {
    const queryClient = useQueryClient()
    const login = useMutation<User, AxiosError<APIValidationError>, LoginCredentials>({
        mutationKey: ["login"],
        mutationFn: async (credentials) => {
            await AxiosClientRaw.get("/csrf-cookie");
            const response = await AxiosClientV1.post<LoginResponse>("/login", credentials);
            return response.data.user;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },


    })
    const signup = useMutation<User, APIValidationError, LoginCredentials>({
        mutationKey: ["signup"],
        mutationFn: async (credentials) => {
            await AxiosClientRaw.get("/csrf-cookie");
            const response = await AxiosClientV1.post<LoginResponse>("/signup", credentials);
            return response.data.user;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },

    })
    const user = useQuery({
        queryKey: ["user"],
        queryFn: async () => await AxiosClientV1.get('/user')
    })

    return {login, signup, user}

}