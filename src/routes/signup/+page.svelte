<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	interface Props {
		data: any;
	}

	let { data }: Props = $props();
	const { errors } = superForm(data.form);
</script>

<form
	class="bg-base-200 flex justify-center items-center flex-col max-w-sm mx-auto mt-20 py-6 rounded-lg"
	use:enhance
	action="?/register"
	method="post"
>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">
			<span class="label-text">Nombre Completo</span>
		</label>
		<input
			type="text"
			autocomplete="off"
			placeholder="Name"
			class="input input-bordered w-full max-w-xs"
			name="name"
			required
		/>
		<p>
			{#if $errors.name}
				<span class="text-error">{$errors.name}</span>
			{/if}
		</p>
	</div>
	<div class="form-control w-full max-w-xs">
		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">
			<span class="label-text">Correo Electronico</span>
		</label>
		<input
			type="text"
			autocomplete="off"
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
			autocomplete="off"
			placeholder="Password"
			class="input input-bordered w-full max-w-xs"
			name="password"
			required
		/>
		<p>
			{#if $errors.password}
				<span class="text-error">{$errors.password}</span>
			{/if}
		</p>
	</div>

	<button class="btn mt-4 max-w-xs btn-primary" type="submit">Crear cuenta</button>

	<p class="pt-2">
		Already have an account? <a href="/login" class="link link-hover font-bold">Login here.</a>
	</p>
</form>
