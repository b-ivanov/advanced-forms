export default {
	name: "ActivateAccount",
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
				uniqueID: "start",
				type: "button",
				func: (context) => {
					context.eventBus.emit('router-navigation-event', {
						url: "businessdetails"
					});
				}
			}
		]
	}
};