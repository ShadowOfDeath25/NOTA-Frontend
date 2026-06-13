import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosClientV1 } from "../../axiosClient";
import { useSnackbar } from "@components/Snackbar/SnackbarContext";
import { useTranslation } from "react-i18next";

interface UpdateRolePayload {
    spaceId: string;
    userId: string;
    role: string;
}

export const useUpdateSpaceUserRole = () => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    const { t } = useTranslation();

    return useMutation({
        mutationKey: ["spaces", "users", "update-role"],
        mutationFn: async ({ spaceId, userId, role }: UpdateRolePayload) => {
            const res = await AxiosClientV1.put(
                `/spaces/${spaceId}/users/${userId}`,
                { role }
            );
            return res.data;
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["spaces", variables.spaceId, "users"],
            });
            showSnackbar({
                type: "success",
                message: t("space.role_updated", "Role updated successfully"),
            });
        },
        onError: () => {
            showSnackbar({
                type: "error",
                message: t("space.role_update_error", "Failed to update role"),
            });
        },
    });
};
