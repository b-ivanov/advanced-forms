<template>
	<div class="outSystem">
		<header>
			<div>
				<img src="/logo.png"/>
			</div>
			<ul>
				<li>Our Solutions</li>
				<li>Pricing</li>
				<li>Developers</li>
				<li>FAQs</li>
				<li>Contact</li>
				<li></li>
				<li>
					<router-link to="/login">Login</router-link>
				</li>
				<li class="headerButton">
					<router-link to="/register">Sign up</router-link>
				</li>
			</ul>
		</header>
		<main class="homeContent">
			<h1>Welcome to Advanced forms</h1>
		</main>
		<footer>Footer</footer>
	</div>
</template>

<script>
/**
* The component renders the home page of the SPA.
*
* @component Home
* @author bivanov
*/
export default {
	name: 'Home'
}
</script>