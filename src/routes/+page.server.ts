import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// let's get the session data
	const session = await locals.getSession();

	// if the user is not logged in, we redirect the user to the login page
	if (!session) {
		throw redirect(303, '/login');
	}

	// otherwise, we return an empty object
	return {};
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.getSession();
		if (!session) return {};

		await locals.supabase.auth.signOut();
		throw redirect(303, '/login');
	}
} satisfies Actions;
