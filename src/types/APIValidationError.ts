export interface APIValidationError {
    message: string | string[],
    errors: Record<string, string[] | string>
}