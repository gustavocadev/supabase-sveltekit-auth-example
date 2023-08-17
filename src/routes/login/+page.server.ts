import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schemas/loginSchema';

export const load = (async ({ locals }) => {
	const session = await locals.getSession();

	// if the user is already logged in, we redirect the user to the home page
	if (session) {
		throw redirect(303, '/');
	}

	// otherwise, we return an empty object
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ locals, request }) => {
		const form = await superValidate(request, loginSchema);

		// if the form is not valid, we return the form with the errors
		if (!form.valid) {
			return fail(500, {
				form
			});
		}

		// if the form is valid, we try to log in the user
		const { error } = await locals.supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		// if there is an error, we return the form with the error
		if (error) {
			return fail(500, {
				form
			});
		}

		// otherwise, we redirect the user to the home page
		throw redirect(303, '/');
	}
};
