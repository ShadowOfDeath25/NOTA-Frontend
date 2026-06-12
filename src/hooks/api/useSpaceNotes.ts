import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { AxiosClientV1 } from "../../axiosClient.ts";
import type { Note } from "@customTypes/Note.ts";

export const useSpaceNotes = (spaceId?: string): UseQueryResult<{ data: Note[] }, Error> => {
    return useQuery<{ data: Note[] }, Error>({
        queryKey: ["spaces", spaceId, "notes"] as const,
        queryFn: async () => {
            const res = await AxiosClientV1.get<{ data: Note[] }>(
                `/spaces/${spaceId}/notes`
            );
            return res.data;
        },
        enabled: !!spaceId,
    });
};
