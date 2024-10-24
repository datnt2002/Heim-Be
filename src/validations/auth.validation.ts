import { z } from 'zod'

const register = z
    .object({
        email: z
            .string({
                required_error: 'Email is required',
            })
            .min(3, 'Email must be longer than 3 characters')
            .email('Email is not valid'),
        username: z
            .string({
                required_error: 'Username is required',
            })
            .min(3, 'Username must be longer than 3 characters')
            .max(10),
        number: z.string({
            required_error: 'Number is required',
        }),
        avatarUrl: z.string().optional(),
        password: z.string({
            required_error: 'Password is required',
        }),
        name: z.string({
            required_error: 'Name is required',
        }),
    })
    .strict()

const login = z
    .object({
        principle: z.string({
            required_error: 'Username or email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    })
    .strict()

export { register, login }
