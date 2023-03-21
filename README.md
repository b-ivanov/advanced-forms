# Advanced forms

## Description
Advanced forms is single page application developed using Vue 3 and additional modules (see list below). It has a Home page from which the user can log in or register. After logging in the user is navigated to the activation wizard to fill in his data devided in 6 forms (see list below). Each form is rendered dynamically from a configuration object stored in the ui_structures folder. It describes sections with fields, their types, validation rules and their layout. Also, the form object may contain urls for data transmission, as well as action buttons for executing different commands. The application is developed in a way to support localization, validation and automatic submition and retrieval of data (details below).

## Build
To build and run the application clone this git repository, install the needed modules and run the development server. This is done with a few commands:
```
cd advanced-forms
npm install
npm run serve
```

## Validation
Validation is handled by the VeeValidate module. The application uses its Form, Field and ErrorMessage components to render errors before submit of the form. Validation rules for each field are stored in the form object.

## Localization
Localization is handled by the i18n module. Each label in the application has a uniqueID wich is later used to take the translation of the text from the corresponding language json in the locales folder.

## Form data transmission
The FormContainer component has build in functions for submitting and retriveing (static and user) data.

## Main forms list
1. Login ([Login.json](./src/ui_structures/forms/Login.js))
2. Register ([Register.json](./src/ui_structures/forms/Register.js))
3. Business details ([BusinessDetails.json](./src/ui_structures/forms/BusinessDetails.js))
4. Business representative ([BusinessRepresentative.json](./src/ui_structures/forms/BusinessRepresentative.js))
5. Bank details ([BankDetails.json](./src/ui_structures/forms/BankDetails.js))
6. Processing information ([ProcessingInformation.json](./src/ui_structures/forms/ProcessingInformation.js))
7. Risk management questionnaire ([RiskManagement.json](./src/ui_structures/forms/RiskManagement.js))
8. Supporting documents ([SupportingDocuments.json](./src/ui_structures/forms/SupportingDocuments.js))

## Form field types
1. Single line text ([FieldSingleLine.vue](./src/components/form/utilities/FieldSingleLine.vue)) - single line input element
2. Multi line text ([FieldMultiLine.vue](./src/components/form/utilities/FieldMultiLine.vue)) - multi line textarea element
3. Radio group ([FieldRadio.vue](./src/components/form/utilities/FieldRadio.vue)) - group of radio elements
4. Checkbox group ([FieldCheckbox.vue](./src/components/form/utilities/FieldCheckbox.vue)) - group of checkbox elements
5. Select ([FieldSelect.vue](./src/components/form/utilities/FieldSelect.vue)) - select element with group of options

## Form layout configuration
Each form object contains a compositionID which specifies how the form is going to be rendered. The supported ids and layouts are:
*	0 - Single row view (Login, Register...)
*	1 - Two rows view (BusinessDetails)
*	2 - Modal view (EnterPassword)
*	3 - Box view (VerifyPassword)

## Used modules
* [Vue 3](https://v3.vuejs.org/) - a progressive framework for building user interfaces.
* [Vue CLI](https://cli.vuejs.org/) - 🛠️ Standard Tooling for Vue.js Development
* [Vue Router](https://router.vuejs.org/) - the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.
* [VeeValidate](https://logaretm.github.io/vee-validate/) - Template Based Form Validation Framework for Vue.js
* [Vue I18n](https://kazupon.github.io/vue-i18n/) - Vue I18n is internationalization plugin for Vue.js
* [Vue Mitt](https://github.com/developit/mitt) - Tiny 200b functional event emitter / pubsub.