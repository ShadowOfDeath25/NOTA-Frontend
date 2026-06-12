import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import {AxiosClientV1} from "../../axiosClient.ts";


export const useRead = <
    TData = unknown,
    TError = unknown

>(
    resource: string,
    id?: string,
    options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey'>
): UseQueryResult<TData, TError> => {
    return useQuery<TData, TError>({
        ...options,
        queryKey: [resource, id] as const,

        queryFn: async () => {
            const res = await AxiosClientV1.get<TData>(
                `/${resource}${id ? `/${id}` : ""}`
            );
            return res.data;
        },
    });
};