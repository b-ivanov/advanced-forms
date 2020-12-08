<template>
	<div class="alreadyMemberHeader">
		<span>Already using?</span>
		<span class="loginBtn">
			<router-link to="/login">Login</router-link>
		</span>
	</div>
</template>

<script>
/**
* The component renders a navigation list for the logged out user.
*
* @component NavigationListMiddle
* @author bivanov
*/
export default {
	name: 'NavigationListMiddle',
}
</script>