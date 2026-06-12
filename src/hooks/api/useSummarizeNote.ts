import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosClientV1 } from "../../axiosClient.ts";

export const useSummarizeNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (noteId: string) =>
            AxiosClientV1.post(`/notes/${noteId}/summarize`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
};
