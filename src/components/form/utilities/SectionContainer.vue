<template>
	<div v-if="properties.showLabel !== false" class="sectionContainerLabel">{{ $t('forms.' + formName + '.' + properties.uniqueID) }}</div>
	<section :id="properties.uniqueID" :class="getClassNames()">
		<template v-for="field in properties.fields" :key="field.name">
			<FieldContainer :formName="formName" :properties="field"/>
		</template>
	</section>
</template>

<script>

import FieldContainer from './FieldContainer.vue';
/**
* The component generates a section shell for capsulating form fields. Its properties are configured by an object, passed as props. Supports multiple layouts.
*
* @component SectionContainer
* @uses FieldContainer.vue
* @author bivanov
*/
export default {
	name: "SectionContainer",
	components: {
		FieldContainer
	},
	props: {
		properties: Object,
		formName: String
  },
	setup (props) {
		/**
		* Returns class names for the layout of the section.
		*
		* @method getClassNames
		* @returns {String}		 	class names
		* @author bivanov
		*/
		const getClassNames = () => {
			const classNames = ["sectionContainerContent"];
			if (props.properties.isCollapseController) {
				classNames.push("collapseController");
			}
			if (typeof props.properties.isCollapsed === "boolean") {
				classNames.push(props.properties.isCollapsed ? "collapsed" : "expanded");
			}
			return classNames.join(" ");
		};

		return {
			getClassNames
		};
	}
}
</script>