<template>
	<button v-if="properties.type === 'submit'" type="submit" class="actionButton">{{ $t('actions.' + properties.uniqueID) }}</button>
	<button v-else :type="properties.type" class="actionButton" @click="clickHandler">{{ $t('actions.' + properties.uniqueID) }}</button>
</template>

<script>
import { getCurrentInstance } from 'vue';
/**
* The component creates a form button by a given config object, passed as props.
*
* @component ActionButton
* @uses vue.js
* @author bivanov
*/
export default {
	name: "ActionButton",
	components: {
	},
	props: {
		properties: Object
  },
	setup (props) {
		const { proxy } = getCurrentInstance();

		/**
		* Executes the action function of the button with a context.
		*
		* @method clickHandler
		* @author bivanov
		*/
		const clickHandler = () => {
			if (typeof props.properties.func === "function") {
				props.properties.func({
					eventBus: proxy.eventBus
				});
			}
		};

		return {
			clickHandler
		};
	}
}
</script>