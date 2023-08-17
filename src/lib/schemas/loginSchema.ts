import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Username must be a string',
			required_error: 'Username is required'
		})
		.email({
			message: 'Username must be a valid email address'
		}),
	password: z.string({
		invalid_type_error: 'Password must be a string',
		required_error: 'Password is required'
	})
});
