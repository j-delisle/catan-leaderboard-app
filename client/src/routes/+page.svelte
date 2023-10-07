<script>
	import { Button } from 'flowbite-svelte';
</script>

<div class="flex flex-col justify-center items-center">
	<div class="mx-auto p-8 text-center">
		<h1>Welcome to the Catan Leaderboard App!</h1>
		<p>A leaderboard app to record games for Catan enthusiasts. All expansions are available!</p>
	</div>

	<div class="p-8 max-w-screen-md w-96 mt-10">
		<div class="flex flex-col space-y-10">
			<Button href="/signup" size="lg">Sign Up</Button>
			<Button href="/login" size="lg">Login</Button>
			<Button href="/leaderboard" size="lg">See the Leaderboard</Button>
		</div>
	</div>
</div>
