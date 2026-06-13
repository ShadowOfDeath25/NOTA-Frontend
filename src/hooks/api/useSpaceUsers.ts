import { useQuery } from "@tanstack/react-query";
import { AxiosClientV1 } from "../../axiosClient";

export const useSpaceUsers = <TData = unknown>(spaceId?: string) => {
  return useQuery<TData>({
    queryKey: ["spaces", spaceId, "users"],
    queryFn: async () => {
      const res = await AxiosClientV1.get<TData>(
        `/spaces/${spaceId}/users`
      );

      return res.data;
    },
    enabled: !!spaceId,
  });
};