<template>
	<div :class="layoutClasses">
		<aside v-if="displaySidebar">
			<Sidebar v-if="(typeof properties.sidebarStructure === 'object')" :properties="properties.sidebarStructure" @toggle-sidebar-display="toggleSidebar"/>
		</aside>
		<div class="content">
			<header>
				<Header v-if="displayHeader" @toggle-sidebar-display="toggleSidebar">
					<component v-if="!!properties.header" :is="properties.header"/>
				</Header>
			</header>
			<main>
				<FormContainer v-if="(typeof properties.formData === 'object')" :properties="properties.formData"/>
			</main>
		</div>
	</div>
</template>

<script>
import { onUpdated, ref, getCurrentInstance } from "vue";
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import FormContainer from '@/components/form/FormContainer.vue';
import NavigationListInSystem from '@/components/views/utilities/NavigationListInSystem.vue';
import NavigationListMiddle from '@/components/views/utilities/NavigationListMiddle.vue';
import LocalDBCommunicator from "@/assets/js/services/LocalDBCommunicator.js";
/**
* The component maintains the structure of the view and applies different styles depending on the screen size.
*
* @component Layout
* @uses vue.js
* @uses Header.vue
* @uses Sidebar.vue
* @uses FormContainer.vue
* @uses NavigationListInSystem.vue
* @uses NavigationListMiddle.vue
* @uses LocalDBCommunicator.js
* @author bivanov
*/
export default {
	name: "Layout",
	components: {
		Header, Sidebar, FormContainer, NavigationListInSystem, NavigationListMiddle
  },
	props: {
		properties: Object
	},
	async setup (props) {
		const { proxy } = getCurrentInstance();
		let displaySidebar = ref(typeof props.properties.showSidebar === "boolean" ? props.properties.showSidebar : true);
		let displayHeader = ref(typeof props.properties.showHeader === "boolean" ? props.properties.showHeader : true);
		let layoutClasses = ref(displaySidebar.value ? "layout sidebarVisible" : "layout");

		/**
		* Shows or hides the sidebar, depending on the given parameter.
		*
		* @method toggleSidebar
		* @param {Boolean} 	isHide	show/hide parameter
		* @author bivanov
		*/
		const toggleSidebar = (isHide) => {
			const aside = document.querySelector(".layout aside");
			if (isHide) {
				aside.style.left = "";
			} else {
				aside.style.left = "0px";
			}
		};

		/**
		* Updates view properies.
		*
		* @method anonymous
		* @author bivanov
		*/
		onUpdated(() => {
			displaySidebar.value = props.properties.showSidebar;
			displayHeader.value = props.properties.showHeader;
			layoutClasses.value = (displaySidebar.value ? "layout sidebarVisible" : "layout");
		});

		await LocalDBCommunicator().then((localDB) => {
			/**
			 * Fired when data is retrieved or written in the local indexedDB.
			 *
			 * @event local-db-event
			 * @param {Object}				options	configuraion object containing the type of maipulation, the new data and a callback function
			 * @author bivanov
			 */
			proxy.eventBus.on('local-db-event', (options) => {
				localDB[options.action](options.param).then((response) => {
					options.callback(response);
				}).catch((error) => {
					console.error("Error while communicating with local DB!", error);
				});
			});
		}).catch((err) => {
			console.error(err);
		});

		return {
			layoutClasses,
			displaySidebar,
			displayHeader,
			toggleSidebar
		};
	}
}
</script>