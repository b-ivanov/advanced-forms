export default {
	name: "BankDetails",
	compositionID: 1,
	urls: {},
	header: {
		title: "title",
		subtitle: "subtitle",
		description: "description"
	},
	content: {
		sections: [
			{
				showLabel: false,
				fields: [
					{
						uniqueID: "company",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "currency",
						type: "select",
						rules: "required",
						options: {
							"BGN": "bgn",
							"EUR": "eur",
						}
					}, {
						uniqueID: "main_number",
						showLabel: false,
						type: "radio",
						rules: "required",
						options: {
							"IBAN": "iban",
							"Account number": "account_number",
						}
					}, {
						uniqueID: "sub_number",
						showLabel: false,
						type: "radio",
						rules: "required",
						options: {
							"BIC": "bic",
							"Routing number": "routing_number"
						}
					}, {
						uniqueID: "iban_field",
						showLabel: false,
						type: "text",
						rules: "required"
					}, {
						uniqueID: "bic_field",
						showLabel: false,
						type: "text",
						rules: "required"
					}
				]
			}
		]
	},
	footer: {
		actions: [{
			uniqueID: "save",
			type: "submit",
			func: (context) => {
				console.log("save");
			}
		}]
	}
};