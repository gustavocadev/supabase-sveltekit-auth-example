<script>
	import { enhance } from '$app/forms';
</script>

<form
	class="bg-base-200 flex justify-center items-center flex-col max-w-sm mx-auto mt-20 py-6 rounded-lg"
	use:enhance
	action="?/login"
	method="post"
>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">
			<span class="label-text">Correo Electronico</span>
		</label>
		<input
			type="text"
			placeholder="Email"
			class="input input-bordered w-full max-w-xs"
			name="email"
			required
		/>
	</div>

	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">
			<span class="label-text">Contraseña</span>
		</label>
		<input
			type="text"
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			name="password"
			required
		/>
	</div>

	<button class="btn mt-4 max-w-xs btn-primary" type="submit"> Iniciar Sesion </button>

	<p class="pt-2">
		Don't have an account? <a href="/signup" class="link link-hover font-bold">Register here.</a>
	</p>
</form>
