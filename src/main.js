import { createApp } from 'vue';
import Root from './components/views/Root.vue';
import router from './router'
import mitt from 'mitt';
import './assets/tailwind.css';
import { defineRule, configure } from "vee-validate";
import * as rules from "@vee-validate/rules";
import { setupI18n } from './i18n';

const i18n = setupI18n("en");

//configure default error message
configure({
	generateMessage: (context) => {
		return i18n.global.t('valudation.required');
	},
});

//register form validation rules
Object.keys(rules).forEach((rule) => {
	defineRule(rule, rules[rule]);
});
defineRule('boolRequired', (value) => {
	return (value === "true" || value === "false" || typeof value === "boolean");
});
defineRule('requiredIf', (value, [dependsOnValue, correctValue]) => {
	if (dependsOnValue === correctValue && (!value || !value.length)) {
		return i18n.global.t('valudation.required');
	}
	return true;
});
defineRule('expandSection', (value, [check, expandableID]) => {
	const expandable = document.getElementById(expandableID);
	if (!value || value.toString() === check) {
		expandable.className = expandable.className.replace("collapsed", "expanded");
	} else {
		expandable.className = expandable.className.replace("expanded", "collapsing");
		setTimeout(() => {
			expandable.className = expandable.className.replace("collapsing", "collapsed");
		}, 300);
	}
	return true;
});
defineRule('expandField', (value, [check, expandableID]) => {
	const expandable = document.getElementById(expandableID);
	if (value.toString() === check) {
		expandable.className = expandable.className.replace("collapsed", "expanded");
	} else {
		expandable.className = expandable.className.replace("expanded", "collapsing");
		setTimeout(() => {
			expandable.className = expandable.className.replace("collapsing", "collapsed");
		}, 300);
	}
	return (value === "true" || value === "false" || typeof value === "boolean");
});

const emitter = mitt();

const AdvancedFormsApp = createApp(Root);
AdvancedFormsApp.config.globalProperties.eventBus = emitter;
AdvancedFormsApp.use(router);
AdvancedFormsApp.use(i18n);
AdvancedFormsApp.mount('#app');