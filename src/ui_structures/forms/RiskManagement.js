export default {
	name: "RiskManagement",
	compositionID: 1,
	urls: {},
	header: {
		title: "title",
		subtitle: "subtitle",
	},
	content: {
		sections: [
			{
				showLabel: false,
				fields: [
					{
						uniqueID: "website",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "industry",
						type: "select",
						rules: "required",
						options: {
							"BGN": "bgn",
							"EUR": "eur"
						}
					}, {
						uniqueID: "description",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "domain_ownership",
						type: "text",
						rules: "required"
					}
				]
			}, {
				uniqueID: "log_in",
				fields: [
					{
						uniqueID: "user",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "password",
						type: "text",
						rules: "required"
					}
				]
			}, {
				showLabel: false,
				fields: [
					{
						uniqueID: "vip_customers",
						fullWidth: true,
						type: "radio",
						rules: "required",
						options: {
							"Yes": true,
							"No": false
						}
					}, {
						uniqueID: "separate_customers",
						fullWidth: true,
						type: "radio",
						rules: "required",
						options: {
							"Yes": true,
							"No": false
						}
					}, {
						uniqueID: "fraud_prevention",
						fullWidth: true,
						type: "radio",
						rules: "required",
						options: {
							"Yes": true,
							"No": false
						}
					}, {
						uniqueID: "fraud_prevention_more",
						fullWidth: true,
						type: "textarea",
						rules: "required"
					}, {
						uniqueID: "preauthorization",
						fullWidth: true,
						type: "radio",
						rules: "required",
						options: {
							"Yes": true,
							"No": false
						}
					}, {
						uniqueID: "support_center",
						fullWidth: true,
						type: "radio",
						rules: "required",
						options: {
							"Yes": true,
							"No": false
						}
					}, {
						uniqueID: "affiliates",
						fullWidth: true,
						type: "radio",
						rules: "required",
						options: {
							"Yes": true,
							"No": false
						}
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