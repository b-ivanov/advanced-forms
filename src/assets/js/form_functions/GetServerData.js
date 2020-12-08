import { getDBTableName } from '@/assets/js/form_functions/shared_utilites.js';

/**
* Class for retrieving static and user data from the server for a given form object. If the form has urls for getting data, requests will be send out, else the main Promise is returned and execution continues.
*
* @class GetServerData
* @constructor
* @uses shared_utilites.js
* @author bivanov
*/
class GetServerData {
	constructor (options = {}) {
		options.eventBus.emit('modal-event', {
			isOverlayVisible: true
		});
		this.formObject = options.formObject;
		// this.formObject = Object.assign({}, options.formObject);
		// this.formObject = JSON.parse(JSON.stringify(options.formObject));
		// console.log(this.formObject);
		this.eventBus = options.eventBus;
	};

	/**
	* Final function for execution when all Promises are resolved.
	*
	* @method endOfCalls
	* @author bivanov
	*/
	endOfCalls () {
		this.eventBus.emit('modal-event', {
			isOverlayVisible: false
		});
	};

	/**
	* Main method of the class. Returns a Promise, when all requests are executed and data is retrieved.
	*
	* @method getConstructObject
	* @returns {Function} Promise function
	* @author bivanov
	*/
	getConstructObject() {
		return new Promise((resolve, reject) => {
			if (this.formObject.urls && this.formObject.urls.getData) {
				setTimeout(() => {
					resolve(null);
					this.endOfCalls();
				}, 3000);
				/*this.getServerDataForForm().then((data) => {
					resolve(data);
					this.endOfCalls();
				}).catch((error) => {
					console.error(error);
				});*/
			} else {
				resolve(null);
				this.endOfCalls();
			}
		});
	};

	/**
	* Adds static (if present) and user (if present) data to given form object.
	*
	* @method addValuesToFormObject
	* @param {Object} 			formStructure form object
	* @param {Object|null}	staticData 		static data from the server /optional/
	* @param {Object|null}	userData			user data from the server /optional/
	* @author bivanov
	*/
	addValuesToFormObject (formStructure, staticData = {}, userData = {}) {
		// console.log("staticData", staticData);
		// console.log("userData", userData);
		const sections = formStructure.content.sections;
		let fields = [];
		let uniqueID = "";
		for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
			fields = sections[sectionIndex].fields;
			for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
				uniqueID = fields[fieldIndex].uniqueID;
				if (staticData[uniqueID]) {
					fields[fieldIndex].options = staticData[uniqueID];
				}
				if (typeof userData[uniqueID] !== "undefined") {
					fields[fieldIndex].value = userData[uniqueID];
				}
				if (typeof userData[uniqueID + '_id'] !== "undefined") {
					fields[fieldIndex].value = userData[uniqueID + '_id'];
				}
				if (typeof fields[fieldIndex].isCollapsed !== "undefined") {
					// fields[fieldIndex].rules.match(/(?<=\@).+?(?=\,)/gim)[0];
					fields[fieldIndex].isCollapsed = !fields[fieldIndex - 1].value; // this might not work properly, right now I am hoping the dependsOn field is the previous one
				}
			}
		}
	};

	/**
	* Gets current activation step ID for retriving server data. Data is returned as a Promise.
	*
	* @method getStepId
	* @returns {Function} Promise function
	* @author bivanov
	*/
	getStepId () {
		return new Promise((resolve, reject) => {
			this.eventBus.emit('local-db-event', {
				action: "getRecordById",
				param: this.formObject.name,
				callback: (formID) => {
					resolve(formID);
				}
			});
		});
	};

	/**
	* Calls functions for retrieving server data. Data is returned as a Promise.
	*
	* @method getServerDataForForm
	* @returns {Function} Promise function
	* @author bivanov
	*/
	getServerDataForForm () {
		return new Promise((resolve, reject) => {
			this.getStepId().then((formID) => {
				this.getStaticAndUsedData(formID).then((data) => {
					resolve(data);
				}).catch((err) => {
					reject(err);
				});
			}).catch((err) => {
				reject(err);
			});
		});
	};

	/**
	* Makes requests for static and user data. Data is returned as a Promise.
	*
	* @method getStaticAndUsedData
	* @param {String|null} formID Step ID for retrieving user data
	* @returns {Object} 					New form object with static and user data
	* @author bivanov
	*/
	getStaticAndUsedData (formID) {
		let promiseAll = [];
		if (this.formObject.urls && this.formObject.urls.getData) {
			if (this.formObject.urls.getData.static) {
				promiseAll.push(this.getServerData(this.formObject.urls.getData.static));
			}
			if (formID && this.formObject.urls.getData.user) {
				let url = this.formObject.urls.getData.user;
				url.path = url.path.replace("#%id%#", formID);
				promiseAll.push(this.getServerData(url));
			}
		}
		return Promise.all(promiseAll).then((data) => {
			if (data[1]) {
				return [data[0], data[1][getDBTableName(this.formObject.name)]];
			} else {
				return data;
			}
		});
	};

	/**
	* Executes a request event. Data is returned as a Promise.
	*
	* @method getServerData
	* @param {Object} request request URL and method 
	* @returns {Function} Promise function
	* @author bivanov
	*/
	getServerData (request) {
		return new Promise((resolve, reject) => {
			this.eventBus.emit('data-transmition-event', {
				type: request.method,
				path: request.path,
				callback: (serverData) => {
					if (serverData.status === 200) {
						resolve(serverData);
					} else {
						this.eventBus.emit('modal-event', {
							isOverlayVisible: true,
							type: "error",
							modalString: serverData.message
						});
						reject(serverData.message);
					}
				}
			});
		});
	};
}

export default GetServerData;