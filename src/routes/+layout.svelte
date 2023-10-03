<script lang="ts">
  import "../app.postcss";

	import { afterNavigate, goto } from '$app/navigation';
	afterNavigate((nav) => {
		console.log(nav);
		// if (import.meta.env.DEV) return;

		// If not logged in, goto login page
		console.log(localStorage.getItem('homework-platform-jwt'));
		if (localStorage.getItem('homework-platform-jwt') == null) {
			if (nav.to?.route.id != '/login') goto('/login');
		}
	});
</script>

<div class="w-full h-full">
  <main>
      <slot />
  </main>
</div>

<style>
</style>
