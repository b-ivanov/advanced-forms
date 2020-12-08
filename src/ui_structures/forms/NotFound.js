const NotFound = {
	name: "NotFound",
	compositionID: 3,
	urls: {
		sendData: {
			store: {
				path: "api/email/verify",
				method: "GET"
			}
		}
	},
	header: {
		title: "title",
		description: "description"
	},
	content: {
		sections: [{
			showLabel: false,
			fields: []
		}]
	},
	footer: {
		actions: [
			{
				uniqueID: "returnToLogin",
				type: "button",
				func: (context) => {
					context.eventBus.emit('router-navigation-event', {
						url: "login"
					});
				}
			}
		]
	}
};
export default NotFound;