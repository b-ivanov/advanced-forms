<template>
	<Field as="textarea" :name="properties.uniqueID" :placeholder="properties.placeholder ? $t(['forms', formName, properties.placeholder].join('.')) : ''" v-model="properties.value" :rules="properties.rules"/>
</template>

<script>
import { Field } from 'vee-validate';
/**
* The component generates a textares. Its properties are configured by an object, passed as props.
*
* @component FieldMultiLine
* @uses vee-validate.js
* @author bivanov
*/
export default {
	name: "FieldMultiLine",
	components: {
		Field
	},
	props: {
		properties: Object,
		formName: String
  }
}
</script>