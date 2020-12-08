


<template>
	<div :class="getLayoutClass(properties.compositionID)">
		<h1 v-if="!!properties.header.title">{{ $t('forms.' + properties.name + '.' + properties.header.title) }}</h1>
		<h2 v-if="!!properties.header.subtitle">{{ $t('forms.' + properties.name + '.' + properties.header.subtitle) }}</h2>
		<p v-if="!!properties.header.description">{{ $t('forms.' + properties.name + '.' + properties.header.description) }}</p>
		<Form @submit="submitAction" :id="properties.name">
			<SectionContainer v-for="section in properties.content.sections" :key="section.name" :formName="properties.name" :properties="section"/>
			<ActionButton v-for="action in properties.footer.actions" :key="action" :properties="action"/>
		</Form>
	</div>
</template>

<script>

import { getCurrentInstance, watchEffect } from 'vue';
import { Form } from 'vee-validate';
import SectionContainer from './utilities/SectionContainer.vue';
import ActionButton from './utilities/ActionButton.vue';
import GetServerData from '@/assets/js/form_functions/GetServerData.js';
import SubmitData from '@/assets/js/form_functions/SubmitData.js';
/**
* The component generates a form view by a given form structure, passed as props. It creates a form shell for capsulating all sections and fields. Provides validation and submition functions. Supports multiple layouts.
*
* @component FormContainer
* @uses vue.js
* @uses vee-validate.js
* @uses SectionContainer.vue
* @uses ActionButton.vue
* @uses GetServerData.js
* @uses SubmitData.js
* @author bivanov
*/
export default {
	name: "FormContainer",
	components: {
		Form, SectionContainer, ActionButton
	},
	props: {
		properties: Object
  },
	setup (props) {
		const { proxy } = getCurrentInstance();
		let currentForm = null;
		let update = null;

		/**
		* Submits the form data and calls the submit action of the form with a context.
		*
		* @method submitAction
		* @param {Object} 	formData	filled-in data from the form
		* @author bivanov
		*/
		const submitAction = (formData) => {
			SubmitData.execute(props.properties, formData, proxy.eventBus).then(() => {
				SubmitData.getSubmitActionFunc(props.properties.footer.actions)({
					eventBus: proxy.eventBus
					// formData: formData
				});
			}).catch((err) => {
				console.error("Error while submiting form data:", err);
			});
		};

		/**
		* Returns class names for the layout of the form, depending on the layout ID.
		*
		* @method getLayoutClass
		* @param {Object} 			compositionID layout ID
		* @returns {String}		 								class names
		* @author bivanov
		*/
		const getLayoutClass = (compositionID) => {
			let classes = ["formContainer"];
			switch (compositionID) {
				case 0:
					classes.push("singleColumn");
					break;
				case 1:
					classes.push("twoColumns");
					break;
				case 2:
					classes.push("popOutBox");
					break;
				case 3:
					classes.push("inPageBox");
					break;
				default:
					break;
			}
			return classes.join(" ");
		};

		/**
		* Updates the view of the form container by the given form structure.
		*
		* @method anonymous
		* @author bivanov
		*/
		watchEffect(() => {
			// console.log("watchEffect", currentForm, props.properties.name);
			if (currentForm !== props.properties.name && props.properties.urls && props.properties.urls.getData) {
				currentForm = props.properties.name;
				update = new GetServerData({
					formObject: props.properties,
					eventBus: proxy.eventBus
				});
				update.getConstructObject().then((data) => {
					if (data) {
						update.addValuesToFormObject(props.properties, data[0], data[1]);
					}
				});
			}
		});

		return {
			getLayoutClass, submitAction
		};
	}
}
</script>