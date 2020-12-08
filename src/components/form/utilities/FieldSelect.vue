<template>
	<Field as="select" :name="properties.uniqueID" :rules="properties.rules" v-model="properties.value" >
		<option v-if="typeof properties.placeholder === 'string'" value="">{{ $t(['forms', formName, properties.placeholder].join('.')) }}</option>
		<option v-for="(item, name) in properties.options" :key="name" :value="name">
			{{ item }}
			<!-- {{ $t(['forms', formName, name].join('.')) }} will need to add translation here -->
		</option>
	</Field>
</template>

<script>
import { Field } from 'vee-validate';
/**
* The component generates a select element with an options list. Options and select properties are configured by an object, passed as props.
*
* @component FieldSelect
* @uses vee-validate.js
* @author bivanov
*/
export default {
	name: "FieldSelect",
	components: {
		Field
	},
	props: {
		properties: Object,
		formName: String
	}
}
</script>