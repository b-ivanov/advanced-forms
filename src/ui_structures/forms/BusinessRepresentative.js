export default {
	name: "BusinessRepresentative",
	compositionID: 1,
	header: {
		title: "title",
		subtitle: "subtitle",
		description: "description"
	},
	content: {
		sections: [
			{
				uniqueID: "director", //representative_type
				fields: [
					{
						uniqueID: "first_name",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "last_name",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "passport",
						halfWidth: true,
						type: "number",
						rules: "required"
					}, {
						uniqueID: "birthday",
						halfWidth: true,
						type: "date",
						rules: "required"
					}, {
						uniqueID: "world_country_id",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "street",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "city",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "email",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "phone",
						type: "number",
						rules: "required"
					}
				]
			}, {
				uniqueID: "hide_signatory",
				isCollapseController: true,
				fields: [
					{
						uniqueID: "signatory_same_as_director",
						showLabel: false,
						fullWidth: true,
						type: "checkbox",
						rules: "expandSection:false,signatory",
						options: {
							"Same as Director/CEO": true
						}
					}
				]
			}, {
				uniqueID: "signatory",
				showLabel: false,
				isCollapsed: false,
				fields: [
					{
						uniqueID: "first_name",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "last_name",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "passport",
						halfWidth: true,
						type: "number",
						rules: "required"
					}, {
						uniqueID: "birthday",
						halfWidth: true,
						type: "date",
						rules: "required"
					}, {
						uniqueID: "world_country_id",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "street",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "city",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "email",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "phone",
						type: "number",
						rules: "required"
					}
				]
			}, {
				uniqueID: "hide_shareholder",
				isCollapseController: true,
				fields: [
					{
						uniqueID: "shareholder_same_as_director",
						showLabel: false,
						fullWidth: true,
						type: "checkbox",
						rules: "expandSection:false,shareholder",
						options: {
							"Same as Director/CEO": true
						}
					}
				]
			}, {
				uniqueID: "shareholder",
				showLabel: false,
				isCollapsed: false,
				fields: [
					{
						uniqueID: "first_name",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "last_name",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "passport",
						halfWidth: true,
						type: "number",
						rules: "required"
					}, {
						uniqueID: "birthday",
						halfWidth: true,
						type: "date",
						rules: "required"
					}, {
						uniqueID: "world_country_id",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "street",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "city",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "email",
						type: "text",
						rules: "required"
					}, {
						uniqueID: "phone",
						type: "number",
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
				func: (constext) => {
					console.log("submit");
				}
			}
		]
	}
};