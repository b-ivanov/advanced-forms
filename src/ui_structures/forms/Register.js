export default {
	name: "Register",
	compositionID: 0,
	urls: {
		sendData: {
			store: {
				path: "api/register",
				method: "POST"
			}
		}
	},
	header: {
		title: "title"
	},
	content: {
		sections: [
			{
				showLabel: false,
				fields: [
					{
						uniqueID: "email",
						type: "email",
						value: "test@abv.bg",
						rules: "required|email"
					}, {
						uniqueID: "name",
						type: "text",
						value: "Test User",
						rules: "required"
					}, {
						uniqueID: "company",
						type: "text",
						value: "Test tech",
						rules: "required"
					}, {
						uniqueID: "password",
						type: "password",
						value: "123456789",
						rules: "required"
					}, {
						uniqueID: "password_confirmation",
						type: "password",
						value: "123456789",
						rules: "required|confirmed:@password"
					}
				]
			}
		]
	},
	footer: {
		actions: [
			{
				uniqueID: "createAccount",
				type: "submit",
				func: (context) => {
					context.eventBus.emit('router-navigation-event', {
						url: "verifyemail"
					});
				}
			}
		]
	}
};