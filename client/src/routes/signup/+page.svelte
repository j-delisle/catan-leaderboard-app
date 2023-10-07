<script>
	/** @type {import('./$types').PageData} */

	import { enhance } from '$app/forms';
	import { Label, Input, ButtonGroup, InputAddon, Button, Helper } from 'flowbite-svelte';
	let show1 = false;
	let show2 = false;

	export let form;
	console.log(form);

	// const passValid = () => {
	// 	if (form === 'undefined') {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// };
</script>

<div class="flex justify-center">
	<form
		method="POST"
		class="p-10 mt-12 w-1/2 space-y-10"
		use:enhance={({ form, data, action }) => {
			// before submission to server
			console.log('form', form);
			console.log('data', data);
			console.log('action', action);
			return async ({ result, update }) => {
				//after submission to server
				if (result.type === 'success') {
					form.reset();
				}
				console.log('result', result);
			};
		}}
	>
		<div>
			<Label for="input-group-1" class="block mb-2">Your Email</Label>
			<Input
				name="email"
				id="email"
				value={form?.email ?? ''}
				type="email"
				placeholder="winner@catan.com"
				required
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
					slot="left"
				>
					<path
						d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
					/>
					<path
						d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
					/>
				</svg>
			</Input>
		</div>
		<div>
			<Label for="password1" class="mb-2">Your password</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<button on:click={() => (show1 = !show1)}>
						{#if show1}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
								<path
									fill-rule="evenodd"
									d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z"
								/>
								<path
									d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z"
								/>
								<path
									d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z"
								/>
							</svg>
						{/if}
					</button>
				</InputAddon>
				<Input
					id="password1"
					name="password1"
					type={show1 ? 'text' : 'password'}
					placeholder="•••••••••"
					required
				/>
				<!-- {#if passValid}
					<Helper class="mt-2" color="red">
						<span class="font-medium">Passwords Do Not Match!</span>
						Please make sure your passwords match
					</Helper>
				{/if} -->
			</ButtonGroup>
		</div>
		<div>
			<Label for="password2" class="mb-2">Your password</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<button on:click={() => (show2 = !show2)}>
						{#if show2}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
								<path
									fill-rule="evenodd"
									d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-6 h-6"
							>
								<path
									d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z"
								/>
								<path
									d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z"
								/>
								<path
									d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z"
								/>
							</svg>
						{/if}
					</button>
				</InputAddon>
				<Input
					id="password2"
					name="password2"
					type={show2 ? 'text' : 'password'}
					placeholder="•••••••••"
					required
				/>
			</ButtonGroup>
		</div>
		<div>
			<Button type="submit" size="lg" class="w-full">Sign Up</Button>
		</div>
	</form>
</div>
