<template>
	<div :id="properties.uniqueID" :class="getClassNames()">
		<label v-if="properties.showLabel !== false" :for="properties.uniqueID">{{ $t(['forms', formName, properties.uniqueID].join('.')) }}</label>
			<component :is="getComponentName()" :formName="formName" :properties="properties"/>
		<ErrorMessage :name="properties.uniqueID" as="div" class="errorMessage"/>
	</div>
</template>

<script>
import { ErrorMessage } from 'vee-validate';
import FieldSingleLine from './FieldSingleLine.vue';
import FieldMultiLine from './FieldMultiLine.vue';
import FieldRadio from './FieldRadio.vue';
import FieldCheckbox from './FieldCheckbox.vue';
import FieldSelect from './FieldSelect.vue';
/**
* The component generates a field shell and calls the corresponding by type component to render. Supports multiple layouts and it is configured by an object, passed as props.
*
* @component FieldContainer
* @uses vee-validate.js
* @uses FieldSingleLine.vue
* @uses FieldMultiLine.vue
* @uses FieldRadio.vue
* @uses FieldCheckbox.vue
* @uses FieldSelect.vue
* @author bivanov
*/
export default {
	name: "FieldContainer",
	components: {
		FieldRadio, FieldCheckbox, FieldSingleLine, FieldMultiLine, ErrorMessage, FieldSelect,
	},
	props: {
		properties: Object,
		formName: String
	},
	setup (props) {
		/**
		* Returns corresponding component name, depending on the field type.
		*
		* @method getComponentName
		* @returns {String} 	name of component
		* @author bivanov
		*/
		const getComponentName = () => {
			switch (props.properties.type) {
				case "radio":
					return "FieldRadio";
					break;
				case "checkbox":
					return "FieldCheckbox";
					break;
				case "textarea":
					return "FieldMultiLine";
					break;
				case "select":
					return "FieldSelect";
					break;
				default:
					return "FieldSingleLine";
					break;
			}
		};

		/**
		* Returns class names for the field shell depending on its properties.
		*
		* @method getClassNames
		* @returns {String} 	class names
		* @author bivanov
		*/
		const getClassNames = () => {
			const classNames = ["fieldContainer"];
			if (props.properties.fullWidth) {
				classNames.push("fullWidth");
			}
			if (props.properties.halfWidth) {
				classNames.push("halfWidth");
			}
			if (typeof props.properties.isCollapsed === "boolean") {
				classNames.push(props.properties.isCollapsed ? "collapsed" : "expanded");
			}
			return classNames.join(" ");
		};
		return {
			getComponentName, getClassNames
		};
	}
}
</script>