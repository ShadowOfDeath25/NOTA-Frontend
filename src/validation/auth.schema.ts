import {z} from 'zod'

const email = z.email();
const password = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)

const login = z.object({
    email: email,
    password: password
});
const auth = {
    fields: {
        email: email,
        password: password
    },
    schemas: {
        login: login
    }
}
export default auth