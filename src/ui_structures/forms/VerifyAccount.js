const getUrlParameters = () => {
	const paramsObj = {};
	let paramsArr = [];
	window.location.search.replace("?", "").split("&").map((item) => {
		paramsArr = item.split("=");
		paramsObj[paramsArr[0]] = paramsArr[1];
	});
	return paramsObj;
};
const paramsToRequest = (params) => {
	let reqArr = ["/", params.id];
	reqArr.push("/", params.verification);
	reqArr.push("?");
	reqArr.push("expires=", params.expires);
	reqArr.push("&");
	reqArr.push("signature=", params.signature);
	return reqArr.join("");
};

const VerifyAccount = {
	name: "VerifyAccount",
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
				uniqueID: "verify",
				type: "button",
				func: (context) => {
					context.eventBus.emit('modal-event', {
						isOverlayVisible: true
					});
					const urlData = VerifyAccount.urls.sendData.store;
					const pathSuffix = paramsToRequest(getUrlParameters());
					console.log(urlData.path + pathSuffix);
					context.eventBus.emit('data-transmition-event', {
						type: urlData.method,
						path: urlData.path + pathSuffix,
						callback: (response) => {
							if (response.status === 200) {
								context.eventBus.emit('modal-event', {
									isOverlayVisible: true,
									modalString: response.message + " You wiil be automatically redirected."
								});
								setTimeout(() => {
									context.eventBus.emit('modal-event', {
										isOverlayVisible: false
									});
									context.eventBus.emit('router-navigation-event', {
										url: "login"
									});
								}, 7000);
							} else {
								context.eventBus.emit('modal-event', {
									isOverlayVisible: true,
									type: "error",
									modalString: response.message
								});
							}
						}
					});
				}
			}
		]
	}
};
export default VerifyAccount;