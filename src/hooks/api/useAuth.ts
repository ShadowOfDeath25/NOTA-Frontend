import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {AxiosClientV1} from "../../axiosClient.ts";
import type {User} from "@customTypes/User.ts";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User
}

export const useAuth = () => {
    const queryClient = useQueryClient()
    const login = useMutation<User, Error, LoginCredentials>({
        mutationKey: ["login"],
        mutationFn: async (credentials) => {
            await AxiosClientV1.get("/csrf-cookie");
            const response = await AxiosClientV1.post<LoginResponse>("/login", credentials);
            return response.data.user;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
        onError: (error) => error.message

    })
    const signup = useMutation<User, Error, LoginCredentials>({
        mutationKey: ["signup"],
        mutationFn: async (credentials) => {
            await AxiosClientV1.get("/csrf-cookie");
            const response = await AxiosClientV1.post<LoginResponse>("/signup", credentials);
            return response.data.user;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
        onError: (error) => error.message
    })
    const user = useQuery({
        queryKey: ["user"],
        queryFn: async () => await AxiosClientV1.get('/user')
    })

    return {login, signup, user}

}