import { fail, type Actions, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { registerSchema } from '$lib/schemas/registerSchema';

export const load = (async ({ locals }) => {
	// let's get the session data
	const session = await locals.getSession();

	// if the user is already logged in, we redirect the user to the home page
	if (session) {
		throw redirect(303, '/');
	}

	// otherwise, we return the form
	const form = await superValidate(registerSchema);
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request, locals, url }) => {
		const form = await superValidate(request, registerSchema);

		// if the form is not valid, we return the form with the errors
		if (!form.valid) {
			return fail(500, {
				form
			});
		}

		// auth.signUp is a helper function that is going to help us to sign up the user, it's going to send a verification email to the user, and it's going to return the user data.
		const { data } = await locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});
		console.log(data);

		return {
			form
		};
	}
} satisfies Actions;
