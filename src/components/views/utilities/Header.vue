<template>
	<div class="logoHolder">
		<div>
			<button class="sidebarToggleBtn" @click="$emit('toggle-sidebar-display', false)">Show sidebar</button>
			<!--img class="logo" src="/logo.png"/-->
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
/**
* The component renders div HTML element to use as a header in the application.
*
* @component Header
* @author bivanov
*/
export default {
	name: 'Header',
	emits: ['toggleSidebarDisplay']
}
</script>