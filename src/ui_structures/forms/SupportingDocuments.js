export default {
	name: "SupportingDocuments",
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
						uniqueID: "certificate_incorporation",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "articles",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "expert",
						type: "radio",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "rub_company",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "rub_director",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "affiliate",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "passport",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "license",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "declaration",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "certificate_standing",
						fullWidth: true,
						type: "file",
						rules: "required"
					}, {
						uniqueID: "processing",
						fullWidth: true,
						type: "file",
						rules: "required"
					}
				]
			}
		]
	},
	footer: {
		actions: [{
			uniqueID: "submit_application",
			type: "submit",
			func: (context) => {
				console.log("submit_application");
			}
		}]
	}
};