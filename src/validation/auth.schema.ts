import {z} from 'zod'
import i18n from '../i18n';


const fields = {
    email: z.email(),
    password: z.string()
        .min(8, {error: i18n.t("validation.password.at_least_8_characters", "Password must be at least 8 characters")})
        .regex(/[a-z]/, {error: i18n.t("validation.password.lowercase_letters", "Password must contain lowercase letters")})
        .regex(/[A-Z]/, {error: i18n.t("validation.password.uppercase_letters", "Password must contain uppercase letters")})
        .regex(/\d/, {error: i18n.t("validation.password.numbers", "Password must contain numbers")})
        .regex(/[\W_]/, {error: i18n.t("validation.password.special_characters", "Password must contain special characters")})
}


const auth = {
    fields,
    schemas: {
        login: z.object({
            email: fields.email,
            password: fields.password
        }),
        signup: z.object({
            email: fields.email,
            password: fields.password,
            password_confirmation: z.string()
        }).refine((data) => (data.password === data.password_confirmation), {
            error: i18n.t("passwords_do_not_match", "Passwords do not match"),
            path: ["password_confirmation"]
        }),
        newPassword: z.object({
            password: fields.password,
            password_confirmation: z.string(),
        }).refine((data) => (data.password === data.password_confirmation), {
            error: i18n.t("passwords_do_not_match", "Passwords do not match"),
            path: ["password_confirmation"]
        })
    }
}
export default auth
