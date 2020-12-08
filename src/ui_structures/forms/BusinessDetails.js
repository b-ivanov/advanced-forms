export default {
	name: "BusinessDetails",
	compositionID: 1,
	urls: {
		getData: {
			static: {
				path: "api/business/details/static",
				method: "GET"
			},
			user: {
				path: "api/business/details/edit/#%id%#",
				method: "GET"
			}
		},
		sendData: {
			store: {
				path: "api/business/details/store",
				method: "PUT"
			},
			update: {
				path: "api/business/details/update/#%id%#",
				method: "PUT"
			}
		}
	},
	header: {
		title: "title",
		subtitle: "subtitle"
	},
	content: {
		sections: [
			{
				uniqueID: "section1",
				fields: [
					{
						uniqueID: "country",
						showLabel: false,
						placeholder: "placeholder_country",
						type: "select",
						rules: "required",
						options: {}
					}, {
						uniqueID: "state",
						showLabel: false,
						placeholder: "placeholder_state",
						type: "text",
						rules: "required|max:50"
					}, {
						uniqueID: "city",
						showLabel: false,
						placeholder: "placeholder_city",
						type: "text",
						rules: "required|max:20"
					}, {
						uniqueID: "zip",
						showLabel: false,
						placeholder: "placeholder_zip",
						type: "text",
						rules: "required|max:20"
					}, {
						uniqueID: "address_1",
						showLabel: false,
						placeholder: "placeholder_address_1",
						type: "text",
						rules: "required|max:255"
					}, {
						uniqueID: "address_2",
						showLabel: false,
						placeholder: "placeholder_address_2",
						type: "text",
						rules: "required|max:255"
					}
				]
			}, {
				uniqueID: "section2",
				showLabel: false,
				fields: [
					{
						uniqueID: "company_name",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "website",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "business_type",
						type: "select",
						options: {},
						rules: "required"
					}, {
						uniqueID: "license",
						type: "text",
						rules: "max:255"
					}, {
						uniqueID: "reg_number",
						type: "text",
						rules: "required|max:50"
					}, {
						uniqueID: "reg_date",
						type: "date",
						rules: "required"
					}, {
						uniqueID: "bankruptcy",
						fullWidth: true,
						type: "radio",
						options: {
							Yes: true,
							No: false
						},
						rules: "expandField:true,bankruptcy_info"
					}, {
						uniqueID: "bankruptcy_info",
						showLabel: false,
						fullWidth: true,
						isCollapsed: true,
						placeholder: "placeholder_bankruptcy_info",
						type: "textarea",
						rules: "requiredIf:@bankruptcy,true"
					}, {
						uniqueID: "violance",
						fullWidth: true,
						type: "radio",
						options: {
							Yes: true,
							No: false
						},
						rules: "expandField:true,violance_info"
					}, {
						uniqueID: "violance_info",
						showLabel: false,
						fullWidth: true,
						isCollapsed: true,
						placeholder: "placeholder_violance_info",
						type: "textarea",
						rules: "requiredIf:@violance,true"
					}, {
						uniqueID: "industry",
						fullWidth: true,
						type: "select",
						options: {},
						placeholder: "placeholder_industry",
						rules: "required"
					}, {
						uniqueID: "business_info",
						showLabel: false,
						fullWidth: true,
						type: "textarea",
						rules: "required"
					}, {
						uniqueID: "billing_terms",
						fullWidth: true,
						type: "textarea",
						rules: "required"
					}, {
						uniqueID: "refund",
						fullWidth: true,
						type: "textarea",
						rules: "required"
					}, {
						uniqueID: "duration",
						type: "select",
						options: {
							1: "Within a day",
							2: "Within two weeks",
							3: "Within a month",
							4: "More than a month"
						},
						placeholder: "placeholder_duration",
						rules: "required"
					}
				]
			}
		]
	},
	footer: {
		actions: [
			{
				uniqueID: "save",
				type: "submit",
				func: (context) => {
					context.eventBus.emit('router-navigation-event', {
						url: "businessrepresentative"
					});
				}
			}
		]
	}
};