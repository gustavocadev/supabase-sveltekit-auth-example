import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

// Instancia de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET({ request }) {
  // Obtener el token del header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return json({ error: 'No autorizado' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');

  // Verificar token con Supabase
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return json({ error: 'Token inválido' }, { status: 401 });
  }

  return json({ message: 'Autenticado', user: data.user });
}
