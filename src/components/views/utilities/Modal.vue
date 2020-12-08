<template>
	<LoadingOverlay v-show="displayOverlay"/>
	<div v-if="!!modalData" class="modal">
		<FormContainer :properties="modalData"/>
	</div>
	<div v-else-if="modalMessage !== ''" class="modal">
		<div :class="'customMessage ' + type">
			<div class="text">
				{{ modalMessage }}
			</div>
			<ActionButton :properties="okButtonProps"/>
		</div>
	</div>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from "vue";
import FormContainer from '@/components/form/FormContainer.vue';
import LoadingOverlay from './LoadingOverlay.vue';
import ActionButton from '@/components/form/utilities/ActionButton.vue';
/**
* The component renders a hidden modal for displaying info, warning and error messages to the user.
*
* @component ViewConstructor
* @uses vue.js
* @uses FormContainer.vue
* @uses LoadingOverlay.vue
* @uses ActionButton.vue
* @author bivanov
*/
export default {
	name: 'Modal',
	components: {
		LoadingOverlay, FormContainer, ActionButton
	},
	setup () {
		const { proxy } = getCurrentInstance();
		let displayOverlay = ref(false);
		let modalData = ref(null);
		let modalMessage = ref("");
		let type = ref("info");
		const okButtonProps = {
			uniqueID: "close",
			type: "button",
			func: (context) => {
				context.eventBus.emit('modal-event', {
					isOverlayVisible: false
				});
			}
		}
		
		/**
		* When the component is mounted it creates a custom event listner for showing and hiding the modal with given messages or forms.
		*
		* @method anonymous
		* @author bivanov
		*/
		onMounted(() => {
			/**
			 * Fired when the modal interface must be manipulated (show/hide/change inner elements).
			 *
			 * @event modal-event
			 * @param {Object}				options	configuraion object containing the name, message and type of the modal
			 * @author bivanov
			 */
			proxy.eventBus.on('modal-event', (options) => {
				displayOverlay.value = options.isOverlayVisible;
				if (options.modalName) {
					modalData.value = require('@/ui_structures/forms/' + options.modalName + '.json');
				} else {
					modalData.value = null;
				}
				if (options.modalString) {
					modalMessage.value = options.modalString;
					type.value = (options.type || "info");
					if (options.modalString === "Unauthenticated.") {
						modalMessage.value = "Authentication error! Please login again.";
					} else {
						modalMessage.value = options.modalString;
					}
				} else {
					modalMessage.value = "";
				}
			});
		});

		return {
			displayOverlay, modalData, type, modalMessage, okButtonProps
		};
	}
}
</script>