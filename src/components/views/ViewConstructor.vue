<template>
	<Suspense>
		<template #default>
			<Layout :properties="layoutProperties"/>
		</template>
		<template #fallback>
			<div><!--Loading--></div>
		</template>
	</Suspense>
</template>

<script>
import { onUpdated, reactive } from "vue";
import Layout from './utilities/Layout.vue';
import ViewsConfig from "@/assets/js/ViewsConfig.js";
/**
* The component uses the special Suspence component to load resources and establish connections to indexedDB and afterwards renders the user interface.
*
* @component ViewConstructor
* @uses vue.js
* @uses Layout.vue
* @uses ViewsConfig.js
* @author bivanov
*/
export default {
	name: 'ViewConstructor',
	components: {
		Layout
	},
	setup () {
		const viewConf = new ViewsConfig();
		const getNewViewProperties = () => {
			const view = viewConf.getPropertiesForView(window.location.pathname);
			document.title = "Advanced forms - " + view.name;
			const formData = require('@/ui_structures/forms/' + view.name + '.js').default;
			let sidebarStructure = null;
			let header = view.headerName;
			let showHeader = view.isHeaderVisible;
			let showSidebar = view.isSidebarVisible;

			if (showSidebar && view.sidebarName) {
				sidebarStructure = require('@/ui_structures/sidebars/' + view.sidebarName + '.json');
			}

			return {
				formData,
				sidebarStructure,
				header,
				showHeader,
				showSidebar
			};
		};
		let layoutProperties = reactive(getNewViewProperties());
		
		/**
		* Updates the view of the view by the given structure object.
		*
		* @method anonymous
		* @author bivanov
		*/
		onUpdated(() => {
			const newView = getNewViewProperties();
			layoutProperties.formData = newView.formData;
			layoutProperties.sidebarStructure = newView.sidebarStructure;
			layoutProperties.header = newView.header;
			layoutProperties.showHeader = newView.showHeader;
			layoutProperties.showSidebar = newView.showSidebar;
		});
		
		return {
			layoutProperties
		};
	}
}
</script>