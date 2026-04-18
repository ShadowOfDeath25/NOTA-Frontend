import type {UseMutationOptions} from "@tanstack/react-query";

export interface MutationProps {
    resource: string,
    options: UseMutationOptions
}