// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	/*
  Most of Supabase's functionalities can be used from the server-side using the Auth Helpers, including user authentication, querying and manipulating data in the Supabase database, and row level security. The only functionality that cannot be used from the server-side are real-time subscriptions, which require websockets and are only available on the client-side.
  */
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	// a little helper that is written for convenience
	event.locals.getSession = async () => {
		const { data } = await event.locals.supabase.auth.getSession();
		const { session } = data;
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
