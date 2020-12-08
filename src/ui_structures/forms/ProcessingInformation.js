export default {
	name: "ProcessingInformation",
	compositionID: 1,
	urls: {},
	header: {
		title: "title",
		subtitle: "subtitle",
	},
	content: {
		sections: [
			{
				uniqueID: "estimated_transactions",
				fields: [
					{
						uniqueID: "estimated_number",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "total_monthly",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "average_transaction",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "min_to_max",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "chargeback",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "origin",
						type: "radio",
						hasOther: true,
						rules: "required",
						options: {
							"Domestic": "domestic",
							"EU": "eu"
						}
					}, {
						uniqueID: "currency",
						type: "radio",
						hasOther: true,
						rules: "required",
						options: {
							"USD": "usd",
							"EUR": "eur",
							"GBP": "gbp",
						}
					}
				]
			}, {
				uniqueID: "processing_history",
				fields: [
					{
						uniqueID: "processed",
						fullWidth: true,
						type: "radio",
						rules: "required|expand:true,section",
						options: {
							"Yes": true,
							"No": false
						}
					}
				]
			}, {
				uniqueID: "processing_history_more",
				isCollapsed: true,
				showLabel: false,
				fields: [
					{
						uniqueID: "former_processor",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "from",
						halfWidth: true,
						type: "date",
						rules: "required"
					}, {
						uniqueID: "to",
						halfWidth: true,
						type: "date",
						rules: "required"
					}, {
						uniqueID: "reason",
						fullWidth: true,
						type: "textarea",
						rules: "required"
					}, {
						uniqueID: "payment_cards",
						fullWidth: true,
						type: "textarea",
						rules: "required"
					}, {
						uniqueID: "other_payment",
						fullWidth: true,
						type: "textarea",
						rules: "required"
					}
				]
			}, {
				uniqueID: "payment_processing",
				fields: [
					{
						uniqueID: "transaction",
						type: "radio",
						hasOther: true,
						rules: "required",
						options: {
							"USD": "usd",
							"EUR": "eur",
							"GBP": "gbp"
						}
					}, {
						uniqueID: "settlement",
						type: "radio",
						hasOther: true,
						rules: "required",
						options: {
							"USD": "usd",
							"EUR": "eur",
							"GBP": "gbp"
						}
					}, {
						uniqueID: "billing",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "city_field",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "3d",
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

			}
		}]
	}
};