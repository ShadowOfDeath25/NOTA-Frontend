import {
    useQuery,
    type UseQueryOptions,
    type UseQueryResult,
} from "@tanstack/react-query";
import {AxiosClientV1} from "../../axiosClient.ts";

interface QueryProps<
    TData,
    TError = unknown,
    TQueryKey extends readonly unknown[] = readonly unknown[]
> {
    resource: string;
    id?: string | number;
    options?: UseQueryOptions<TData, TError, TData, TQueryKey>;
}

export const useRead = <
    TData = unknown,
    TError = unknown
>({
      resource,
      id,
      options,
  }: QueryProps<TData, TError>): UseQueryResult<TData, TError> => {
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