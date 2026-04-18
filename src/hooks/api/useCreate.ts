import {useMutation, useQueryClient, type UseMutationOptions} from "@tanstack/react-query";
import {type AxiosResponse} from "axios";
import axiosClient from "../../axiosClient.ts";

export const useCreate = <
    TData = unknown,
    TError = unknown,
    TVariables = unknown,
    TContext = unknown
>(
    resource: string,
    options?: UseMutationOptions<
        AxiosResponse<TData>,
        TError,
        TVariables,
        TContext
    >
) => {
    const queryClient = useQueryClient();

    return useMutation<
        AxiosResponse<TData>,
        TError,
        TVariables,
        TContext
    >({
        ...options,
        mutationKey: ["create", resource],

        mutationFn: (payload: TVariables) =>
            axiosClient.post<TData>(`/${resource}`, payload),

        onSuccess: (data, variables, onMutateResult, context) => {
            queryClient.invalidateQueries({queryKey: [resource]});

            options?.onSuccess?.(data, variables, onMutateResult, context);
        },
    });
};