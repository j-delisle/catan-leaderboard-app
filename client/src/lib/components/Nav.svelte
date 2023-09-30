<script>
	import { page } from '$app/stores';
	import {
		Button,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider
	} from 'flowbite-svelte';

	$: activeUrl = $page.url.pathname;
	let auth = false;
</script>

<Navbar>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Settler's of Catan</span
		>
	</NavBrand>

	{#if auth}
		<div class="flex items-center md:order-2">
			<Avatar id="avatar-menu" src="/images/profile-picture-3.webp" />
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">Bonnie Green</span>
				<span class="block truncate text-sm font-medium">name@flowbite.com</span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownItem>Earnings</DropdownItem>
			<DropdownDivider />
			<DropdownItem>Sign out</DropdownItem>
		</Dropdown>
	{:else}
		<div class="flex space-x-8 md:order-2">
			<Button href="/signup" size="sm">Sign Up</Button>
			<Button href="/login" size="sm">Login</Button>
			<NavHamburger />
		</div>
	{/if}
	<NavUl {activeUrl}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/leaderboard">Leaderboard</NavLi>
		<NavLi href="/record_game">Record Game</NavLi>
	</NavUl>
</Navbar>
