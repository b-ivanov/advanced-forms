<template>
	<div v-for="(item, name) in properties.options" :key="name" @click="selectCheckbox" class="inputCheckboxContainer">
		<span>{{ name }}</span>
		<!-- <span>{{ $t(['forms', formName, name].join('.')) }}</span> will need to add translation here -->
		<Field as="input" type="checkbox" :name="properties.uniqueID" :value="item" v-model="properties.value" :rules="properties.rules"/>
	</div>
</template>

<script>
import { Field } from 'vee-validate';
/**
* The component creates a checkbox group by a given config object, passed as props.
*
* @component FieldCheckbox
* @uses vee-validate.js
* @author bivanov
*/
export default {
	name: "FieldCheckbox",
	components: {
		Field
	},
	props: {
		properties: Object,
		formName: String
	},
	setup () {
		/**
		* Transfers the click event from a parent element or label to the checkbox to be selected/deselected.
		*
		* @method selectCheckbox
		* @param {Object} 	element	HTML element clicked
		* @author bivanov
		*/
		const selectCheckbox = (element) => {
			const elemTagName = element.target.tagName.toLowerCase();
			if (elemTagName === "div") {
				element.target.children[1].click();
			}
			if (elemTagName === "span") {
				element.target.parentNode.children[1].click();
			}
		}
		return {
			selectCheckbox
		};
	}
}
</script>