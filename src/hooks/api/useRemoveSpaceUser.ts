import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosClientV1 } from "../../axiosClient";
import { useSnackbar } from "@components/Snackbar/SnackbarContext";
import { useTranslation } from "react-i18next";

interface RemoveUserPayload {
    spaceId: string;
    userId: string;
}

export const useRemoveSpaceUser = () => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    const { t } = useTranslation();

    return useMutation({
        mutationKey: ["spaces", "users", "remove"],
        mutationFn: async ({ spaceId, userId }: RemoveUserPayload) => {
            const res = await AxiosClientV1.delete(
                `/spaces/${spaceId}/users/${userId}`,
            );
            return res.data;
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["spaces", variables.spaceId, "users"],
            });
            queryClient.invalidateQueries({
                queryKey: ["spaces"],
            });
            showSnackbar({
                type: "success",
                message: t("space.remove_member_success", "Member removed successfully"),
            });
        },
        onError: () => {
            showSnackbar({
                type: "error",
                message: t("space.remove_member_error", "Failed to remove member"),
            });
        },
    });
};
