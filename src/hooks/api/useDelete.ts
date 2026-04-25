import {useMutation, useQueryClient, type UseMutationOptions} from "@tanstack/react-query";
import {type AxiosResponse} from "axios";
import {AxiosClientV1} from "../../axiosClient.ts";

type IdType = string | number;

export const useDelete = <
    TData = unknown,
    TError = unknown,
    TVariables extends IdType = IdType,
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
        mutationKey: [resource, "delete"],

        mutationFn: (id: TVariables) =>
            AxiosClientV1.delete<TData>(`/${resource}/${id}`),

        onSuccess: (data, variables, onMutateResult, context) => {
            queryClient.invalidateQueries({queryKey: [resource]});

            options?.onSuccess?.(data, variables, onMutateResult, context);
        },
    });
};