import { getDBTableName } from '@/assets/js/form_functions/shared_utilites.js';

/**
* If the given form objects has URLs for submitting data, on submit, the form data is collected and send to the corresponding URL.
*
* @namespace SubmitData
* @uses shared_utilites.js
* @author bivanov
*/
const SubmitData = {
	/**
	* Calls the corresponding function depending on the form type.
	*
	* @method execute
	* @param {Object} 	formProperties 	form config object
	* @param {Object}		formData 				form data
	* @param {Object}		eventBus				event bus system
	* @author bivanov
	* @returns {Function} 							Promise function
	*/
	execute (formProperties, formData, eventBus) {
		const submitType = (formProperties.name.toLowerCase() + "Submit");
		const submitFunc = SubmitData[submitType] || SubmitData.defaultSubmit;
		SubmitData.executeStart(eventBus);
		return submitFunc(formProperties, formData, eventBus).then((data) => {
			SubmitData.executeEnd(eventBus);
			return data;
		}).catch((error) => {
			SubmitData.executeError(eventBus, error);
			return error;
		});
	},

	/**
	* Method called before submitting data to the server.
	*
	* @method executeStart
	* @param {Object}		eventBus				event bus system
	* @author bivanov
	*/
	executeStart (eventBus) {
		eventBus.emit('modal-event', {
			isOverlayVisible: true
		});
	},

	/**
	* Method called after submitting data to the server.
	*
	* @method executeEnd
	* @param {Object}		eventBus				event bus system
	* @author bivanov
	*/
	executeEnd(eventBus) {
		eventBus.emit('modal-event', {
			isOverlayVisible: false
		});
	},

	/**
	* Method called when an error occured while submitting data to the server.
	*
	* @method executeError
	* @param {Object}		eventBus				event bus system
	* @author bivanov
	*/
	executeError (eventBus, error) {
		eventBus.emit('modal-event', {
			isOverlayVisible: true,
			type: "error",
			modalString: error
		});
	},

	/**
	* Submits login form data to the server.
	*
	* @method loginSubmit
	* @param {Object} 	formProperties 	form config object
	* @param {Object}		formData 				form data
	* @param {Object}		eventBus				event bus system
	* @returns {Function} 							Promise function
	* @author bivanov
	*/
	loginSubmit (formProperties, formData, eventBus) {
		return new Promise((resolve, reject) => {
			const urlData = formProperties.urls.sendData.store;
			eventBus.emit('data-transmition-event', {
				type: urlData.method,
				path: urlData.path,
				data: formData,
				callback: (serverResponse) => {
					if (serverResponse.status === 200) {
						const newFieldValues = SubmitData.getNewFields(serverResponse);
						eventBus.emit('token-refresh-event', serverResponse.token);
						eventBus.emit('local-db-event', {
							action: "updateMultipleRecords",
							param: newFieldValues,
							callback: (addedFields) => {
								if (addedFields.length === newFieldValues.length) {
									resolve();
								} else {
									console.error("Response from local DB was incorrect!");
									reject("Response from local DB was incorrect!");
								}
							}
						});
					} else {
						reject(serverResponse.message);
					}
				}
			});
		});
	},

	/**
	* Submits register form data to the server.
	*
	* @method registerSubmit
	* @param {Object} 	formProperties 	form config object
	* @param {Object}		formData 				form data
	* @param {Object}		eventBus				event bus system
	* @returns {Function} 							Promise function
	* @author bivanov
	*/
	registerSubmit (formProperties, formData, eventBus) {
		return new Promise((resolve, reject) => {
			const urlData = formProperties.urls.sendData.store;
			eventBus.emit('data-transmition-event', {
				type: urlData.method,
				path: urlData.path,
				data: formData,
				callback: (response) => {
					if (response.status === 201) {
						resolve();
					} else {
						reject(response.message);
					}
				}
			});
		});
	},

	/**
	* Submits default form data to the server.
	*
	* @method defaultSubmit
	* @param {Object} 	formProperties 	form config object
	* @param {Object}		formData 				form data
	* @param {Object}		eventBus				event bus system
	* @returns {Function} 							Promise function
	* @author bivanov
	*/
	defaultSubmit (formProperties, formData, eventBus) {
		return new Promise((resolve, reject) => {
			eventBus.emit('local-db-event', {
				action: "getRecordById",
				param: formProperties.name,
				callback: (formID) => {
					let urlData = formProperties.urls.sendData.store;
					if (formID) {
						urlData = {
							method: formProperties.urls.sendData.update.method,
							path: formProperties.urls.sendData.update.path.replace("#%id%#", formID)
						};
					}
					eventBus.emit('data-transmition-event', {
						type: urlData.method,
						path: urlData.path,
						data: formData,
						callback: (serverResponse) => {
							if (serverResponse.status === 200 || serverResponse.status === 201) {
								resolve();
							} else {
								reject(serverResponse.message);
							}
						}
					});
				}
			});
		});
	},

	/**
	* Retrieves new fields data to be stored in the local indexedDB from the server response.
	*
	* @method getNewFields
	* @param {Object} 	serverData 	data from response
	* @returns {Object}							array of field objects
	* @author bivanov
	*/
	getNewFields (serverData) {
		return [{
			id: "accessToken",
			type: "system",
			value: serverData.token
		}, {
			id: "isVerified",
			type: "system",
			value: serverData.isVerified
		}, {
			id: "company",
			type: "user",
			value: serverData.user.company
		}, {
			id: "email",
			type: "user",
			value: serverData.user.email
		}, {
			id: "id",
			type: "user",
			value: serverData.user.id
		}, {
			id: "name",
			type: "user",
			value: serverData.user.name
		}, {
			id: "status",
			type: "user",
			value: serverData.user.status
		}, {
			id: "BankDetails",
			type: "activation",
			value: serverData.activation[getDBTableName("BankDetails")]
		}, {
			id: "BusinessDetails",
			type: "activation",
			value: serverData.activation[getDBTableName("BusinessDetails")]
		}, {
			id: "BusinessRepresentative",
			type: "activation",
			value: serverData.activation[getDBTableName("BusinessRepresentative")]
		}, {
			id: "ProcessingInformation",
			type: "activation",
			value: serverData.activation[getDBTableName("ProcessingInformation")]
		}, {
			id: "RiskManagement",
			type: "activation",
			value: serverData.activation[getDBTableName("RiskManagement")]
		}, {
			id: "SupportingDocuments",
			type: "activation",
			value: serverData.activation[getDBTableName("SupportingDocuments")]
		}];
	},

	/**
	* Filters the given actions array by a given propertyy and value.
	*
	* @method getActionBy
	* @param {Array} 		actions 	form actions array
	* @param {String} 	property 	property to filter by
	* @param {String} 	value 		value to filter by
	* @returns {Object}						action object
	* @author bivanov
	*/
	getActionBy (actions, property, value) {
		for (let index in actions) {
			if (actions[index][property] === value) {
				return actions[index];
			}
		}
		return null;
	},


	/**
	* Calls the filter function to retrieve the submit action of the given array.
	*
	* @method getSubmitActionFunc
	* @param {Object} 	actions 	form actions array
	* @returns {Object}						action object
	* @author bivanov
	*/
	getSubmitActionFunc (actions) {
		return SubmitData.getActionBy(actions, "type", "submit").func;
	}
};

export default SubmitData;