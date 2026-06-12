import { useQuery } from "@tanstack/react-query";
import { AxiosClientV1 } from "../../axiosClient";

export const useSpaceUsers = (spaceId?: string) => {
  return useQuery({
    queryKey: ["spaces", spaceId, "users"],
    queryFn: async () => {
      const res = await AxiosClientV1.get(
        `/spaces/${spaceId}/users`
      );

      return res.data;
    },
    enabled: !!spaceId,
  });
};