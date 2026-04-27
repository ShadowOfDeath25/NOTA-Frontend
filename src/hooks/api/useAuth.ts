import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {AxiosClientV1, AxiosClientRaw} from "../../axiosClient.ts";
import type {User} from "@customTypes/User.ts";
import {type LoginCredentials} from '@customTypes/LoginCredentials.ts'
import {AxiosError} from "axios"
import type {APIValidationError} from "@customTypes/APIValidationError.ts";
import {useNavigate} from "react-router-dom";

interface LoginResponse {
    user: User
}

export const useAuth = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const login = useMutation<User, AxiosError<APIValidationError>, LoginCredentials>({
        mutationKey: ["login"],
        mutationFn: async (credentials) => {
            await AxiosClientRaw.get("/csrf-cookie");
            const response = await AxiosClientV1.post<LoginResponse>("/login", credentials);
            return response.data.user;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user"]})
        },


    })
    const signup = useMutation<User, APIValidationError, LoginCredentials>({
        mutationKey: ["signup"],
        mutationFn: async (credentials) => {
            await AxiosClientRaw.get("/csrf-cookie");
            const response = await AxiosClientV1.post<LoginResponse>("/signup", credentials);
            return response.data.user;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user"]})
        },

    })
    const user = useQuery<User, AxiosError>({
        queryKey: ["user"],
        queryFn: async () => {
            try {
                //const res = await AxiosClientV1.get('/user', {})
                //return res.data.user
                return {id: 1, name: "Test User"};
                //return null;
            } catch (e) {
                if (e instanceof AxiosError && e.response?.status === 401) {
                    return null;
                }
                throw e;
            }
        },

    })
    const logout = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            await AxiosClientV1.post("/logout");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user"]})
            navigate("/login")
        },
    })

    return {login, signup, user, logout}

}