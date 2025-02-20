import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
  console.log(request.headers.get('Authorization'));
  const { session } = await locals.safeGetSession();
  if (!session) {
    redirect(303, '/login');
  }

  console.log({ session });
  // if the form is not valid, we return the form with the errors

  return Response.json({
    msg: 'Hello world',
  });
};