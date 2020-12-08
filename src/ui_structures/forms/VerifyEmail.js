export default {
	name: "VerifyEmail",
	compositionID: 3,
	header: {
		title: "title",
		description: "description"
	},
	content: {
		sections: []
	},
	footer: {
		actions: [
			{
				uniqueID: "cancel",
				type: "button",
				func: (context) => {
					console.log("cancel");
				}
			}, {
				uniqueID: "resendVerification",
				type: "button",
				func: (context) => {
					console.log("resendVerification");
				}
			}
		]
	}
};