import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosClientV1 } from "../../axiosClient.ts";
import type { User, UserSettings } from "@customTypes/User.ts";

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();

    return useMutation<
        { user: User },
        Error,
        Partial<UserSettings>,
        { previousUser: User | null }
    >({
        mutationKey: ["user", "settings", "update"],

        mutationFn: async (payload) => {
            const userData = queryClient.getQueryData<User>(["user"]);

            if (!userData?.id) {
                throw new Error("User ID not found");
            }

            const res = await AxiosClientV1.put<{ user: User }>(
                `/users/${userData.id}`,
                {
                    settings: {
                        ...userData?.settings,
                        ...payload
                    }
                }
            );

            return res.data;
        },

        onMutate: async (newSettings) => {
            await queryClient.cancelQueries({
                queryKey: ["user"],
            });

            const previousUser =
                queryClient.getQueryData<User>(["user"]) ?? null;

            if (previousUser) {
                queryClient.setQueryData<User>(["user"], {
                    ...previousUser,
                    settings: {
                        ...previousUser.settings,
                        ...newSettings,
                    } as User["settings"],
                });
            }

            return { previousUser };
        },

        onError: (_error, _newSettings, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(
                    ["user"],
                    context.previousUser
                );
            }
        },

        onSuccess: (data: any) => {
            const updatedUser = data?.user || data?.data || data;
            if (updatedUser) {
                queryClient.setQueryData<User>(
                    ["user"],
                    updatedUser
                );
            }
        },

    });
};