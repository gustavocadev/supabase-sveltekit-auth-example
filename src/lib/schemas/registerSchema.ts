import { z } from 'zod';

export const registerSchema = z.object({
	email: z
		.string({
			invalid_type_error: 'Username must be a string',
			required_error: 'Username is required'
		})
		.email({
			message: 'Username must be a valid email address'
		}),
	password: z
		.string({
			invalid_type_error: 'Password must be a string'
		})
		.min(6, 'Password must be at least 6 characters long')
		.max(100, 'Password must be at most 100 characters long'),
	name: z
		.string({
			invalid_type_error: 'Name must be a string'
		})
		.min(2, 'Name must be at least 2 characters long')
		.max(40, 'Name must be at most 40 characters long')
});
