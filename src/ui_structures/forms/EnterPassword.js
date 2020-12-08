export default {
	name: "EnterPassword",
	compositionID: 2,
	header: {
		title: "title"
	},
	content: {
		sections: [
			{
				showLabel: false,
				fields: [
					{
						uniqueID: "password",
						type: "password",
						rules: "required"
					}
				]
			}
		]
	},
	footer: {
		actions: [
			{
				uniqueID: "cancel",
				type: "button",
				func: (context) => {
					context.eventBus.emit('modal-event', {
						isOverlayVisible: false
					});
				}
			}, {
				uniqueID: "confirm",
				type: "submit"
			}
		]
	}
};