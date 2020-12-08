<template>
	<Field as="input" :name="properties.uniqueID" :type="properties.type" :placeholder="properties.placeholder ? $t(['forms', formName, properties.placeholder].join('.')) : ''" v-model="properties.value" :rules="properties.rules"/>
</template>

<script>
import { Field } from 'vee-validate';
/**
* The component generates an input. Its properties are configured by an object, passed as props.
*
* @component FieldSingleLine
* @uses vee-validate.js
* @author bivanov
*/
export default {
	name: "FieldSingleLine",
	components: {
		Field
	},
	props: {
		properties: Object,
		formName: String
  }
}
</script>