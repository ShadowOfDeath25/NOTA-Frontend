export interface APIValidationError {
    message: string,
    errors: Record<string, string[]>
}