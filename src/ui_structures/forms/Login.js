export default {
	name: "Login",
	compositionID: 0,
	urls: {
		sendData: {
			store: {
				path: "api/login",
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
						uniqueID: "password",
						type: "password",
						value: "123456789",
						rules: "required"
					}
				]
			}
		]
	},
	footer: {
		actions: [
			{
				uniqueID: "continue",
				type: "submit",
				func: (context) => {
					context.eventBus.emit('router-navigation-event', {
						url: "activation"
					});
				}
			}
		]
	}
};