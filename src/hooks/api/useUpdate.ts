import {useMutation, useQueryClient, type UseMutationOptions} from "@tanstack/react-query";
import {type AxiosResponse} from "axios";
import axiosClient from "../../axiosClient.ts";

interface BasePayload {
    id: string | number;
}

export const useUpdate = <
    TData = unknown,
    TError = unknown,
    TVariables extends BasePayload = BasePayload,
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
        mutationKey: [resource, "update"],
        mutationFn: (payload: TVariables) =>
            axiosClient.put<TData>(`/${resource}/${payload.id}`, payload),

        onSuccess: (data, variables, onMutateResult, context) => {
            queryClient.invalidateQueries({queryKey: [resource]});

            options?.onSuccess?.(data, variables, onMutateResult, context);
        },
    });
};