/**
* Namespace for communicating with the local IndexedDB.
*
* @namespace LocalDBCommunicator
* @author bivanov
*/
const LocalDBCommunicator = {
	version: 1,
	DATABASE_NAME: "AdvancedFormsDB",
	STORE_NAME: "personalData",
	INDEX_NAME: "TYPE",
	AdvancedFormsDB: null,

	/**
	* Handler for when the indexedDB needs to be updated.
	*
	* @method _upgradeneededHandler
	* @param {Object}		event		indexedDB event
	* @author bivanov
	*/
	_upgradeneededHandler (event) {
		// the existing database version is less than 2 (or it doesn't exist)
		const db = LocalDBCommunicator.AdvancedFormsDB.result;
		switch (event.oldVersion) { // existing db version
			case 0:
				// version 0 means that the client had no database
				// perform initialization
				if (!db.objectStoreNames.contains(LocalDBCommunicator.STORE_NAME)) { // if there's no store
					const store = db.createObjectStore(LocalDBCommunicator.STORE_NAME, {
						keyPath: "id"
					}); // create it
					store.createIndex(LocalDBCommunicator.INDEX_NAME, 'type');
				}
				break;
			case 1:
				// client had version 1
				// update
				break;
		}
	},

	/**
	* Handler for when the indexedDB is successfully opened.
	*
	* @method _onsuccessHandler
	* @returns {Function} Promise function
	* @author bivanov
	*/
	_onsuccessHandler () {
		return new Promise((resolve, reject) => {
			LocalDBCommunicator._getAllRecords().then((allrecords) => {
				if (allrecords.length > 0) {
					resolve();
				} else {
					LocalDBCommunicator._addMultipleRecords(LocalDBCommunicator._getDefaultRecords()).then(() => {
						resolve();
					}).catch((error) => {
						reject(error);
					});
				}
			}).catch((error) => {
				reject(error);
			});
		});
	},

	/**
	* Creates a transaction object to the indexedDB.
	*
	* @method _getTransaction
	* @param {String}		type		type of access (readonly|readwrite)
	* @returns {Object} 				transaction object
	* @author bivanov
	*/
	_getTransaction (type = "readonly") {
		const transaction = LocalDBCommunicator.AdvancedFormsDB.result.transaction(LocalDBCommunicator.STORE_NAME, type);
		transaction.oncomplete = (event) => {
			// console.log("Transaction completed!", event);
		};
		transaction.onabort = (event) => {
			console.error('Transaction failed: ' + event.target.errorCode, event);
		};
		return transaction;
	},

	/**
	* Returns default records for IndexedDB.
	*
	* @method _getDefaultRecords
	* @returns {Array} 				array of record objects
	* @author bivanov
	*/
	_getDefaultRecords () {
		return [
			{
				id: "locale",
				type: "system",
				value: "en"
			}, {
				id: "accessToken",
				type: "system",
				value: ""
			}, {
				id: "isVerified",
				type: "system",
				value: false
			}, {
				id: "id",
				type: "user",
				value: 0
			}, {
				id: "name",
				type: "user",
				value: ""
			}, {
				id: "email",
				type: "user",
				value: ""
			}, {
				id: "status",
				type: "user",
				value: "pending"
			}, {
				id: "company",
				type: "user",
				value: ""
			}, {
				id: "BusinessDetails",
				type: "activation",
				value: ""
			}, {
				id: "BusinessRepresentative",
				type: "activation",
				value: ""
			}, {
				id: "BankDetails",
				type: "activation",
				value: ""
			}, {
				id: "ProcessingInformation",
				type: "activation",
				value: ""
			}, {
				id: "RiskManagement",
				type: "activation",
				value: ""
			}, {
				id: "SupportingDocuments",
				type: "activation",
				value: ""
			}
		];
	},

	/**
	* Creates multiple Propmises to store multiple ojbects in indexedDB.
	*
	* @method _addMultipleRecords
	* @param {Array} 		records 	array of record objects
	* @returns {Function}					Promise function
	* @author bivanov
	*/
	_addMultipleRecords (records) {
		let promiseAll = [];
		for (let r in records) {
			promiseAll.push(LocalDBCommunicator._addRecord(records[r]));
		}
		return Promise.all(promiseAll);
	},
	
	/**
	* Adds given record to indexedDB.
	*
	* @method _addRecord
	* @param {Object} 		record	 	record objects
	* @returns {Function} 					Promise function
	* @author bivanov
	*/
	_addRecord (record) {
		return LocalDBCommunicator._executeRequest({
			type: "readwrite",
			command: "put",
			params: record
		});
	},

	/**
	* Retrieves multiple records by given IDs.
	*
	* @method _getMultipleRecordsById
	* @param {Array} 		ids	 	array of IDs
	* @returns {Function} 		Promise function
	* @author bivanov
	*/
	_getMultipleRecordsById (ids) {
		let promiseAll = [];
		for (let i in ids) {
			promiseAll.push(LocalDBCommunicator._getRecordById(ids[i]));
		}
		return Promise.all(promiseAll);
	},

	/**
	* Retrieves a record by given ID.
	*
	* @method _getRecordById
	* @param {String} 		id	 	array of IDs
	* @returns {Function} 			Promise function
	* @author bivanov
	*/
	_getRecordById (id) {
		return LocalDBCommunicator._executeRequest({
			type: "readonly",
			command: "get",
			params: id
		});
	},

	/**
	* Retrieves a record by given type.
	*
	* @method _getRecordsByType
	* @param {String} 		type	 	type of record
	* @returns {Function} 				Promise function
	* @author bivanov
	*/
	_getRecordsByType (type) {
		return LocalDBCommunicator._executeRequest({
			type: "readonly",
			command: "getAll",
			useIndex: true,
			params: type
		});
	},

	/**
	* Retrieves all records from indexedDB.
	*
	* @method _getAllRecords
	* @returns {Function} 				Promise function
	* @author bivanov
	*/
	_getAllRecords () {
		return LocalDBCommunicator._executeRequest({
			type: "readonly",
			command: "getAll"
		});
	},

	/**
	* Executes a transaction to indexedDB by a given gonfig object.
	*
	* @method _executeRequest
	* @param {Object} 		options	 	gonfig object, containing type, command and parameter for the transaction
	* @returns {Function} 					Promise function
	* @author bivanov
	*/
	_executeRequest (options) {
		return new Promise((resolve, reject) => {
			const transaction = LocalDBCommunicator._getTransaction(options.type);
			const store = transaction.objectStore(LocalDBCommunicator.STORE_NAME);
			let request = null;
			if (options.useIndex) {
				const typeIndex = store.index(LocalDBCommunicator.INDEX_NAME);
				request = typeIndex[options.command](options.params);
			} else {
				request = store[options.command](options.params);
			}

			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = (event) => {
				reject(event);
			};
		});
	},

	/**
	* Translate an indexedDB object to a flat key-value object.
	*
	* @method _dataTranslator
	* @param {Object} 		inData	 	indexedDB object
	* @returns {Object} 						flat key-value object
	* @author bivanov
	*/
	_dataTranslator (inData) {
		const outData = {};
		for (let name in inData) {
			outData[inData[name].id] = inData[name].value;
		}
		return outData;
	},

	external: {
		/**
		* Returns the version of the database.
		*
		* @method getDBVersion
		* @returns {String} 				version of the database
		* @author bivanov
		*/
		getDBVersion () {
			return LocalDBCommunicator.version;
		},

		/**
		* Retrieves a record by given ID.
		*
		* @public
		* @method getRecordById
		* @param {String} 		id	 	array of IDs
		* @returns {Function} 			Promise function
		* @author bivanov
		*/
		getRecordById (id) {
			return LocalDBCommunicator._getRecordById(id).then((data) => {
				return data.value;
			});
		},

		/**
		* Retrieves multiple records by given IDs.
		*
		* @public
		* @method getMultipleRecordsById
		* @param {Array} 		ids	 	array of IDs
		* @returns {Function} 		Promise function
		* @author bivanov
		*/
		getMultipleRecordsById (ids) {
			return LocalDBCommunicator._getMultipleRecordsById(ids).then((data) => {
				return LocalDBCommunicator._dataTranslator(data);
			});
		},

		/**
		* Retrieves a record by given type.
		*
		* @public
		* @method getRecordsByType
		* @param {String} 		type	 	type of record
		* @returns {Function} 				Promise function
		* @author bivanov
		*/
		getRecordsByType (type) {
			return LocalDBCommunicator._getRecordsByType(type);
		},

		/**
		* Retrieves all records from indexedDB.
		*
		* @public
		* @method getAllRecords
		* @returns {Function} 				Promise function
		* @author bivanov
		*/
		getAllRecords () {
			return LocalDBCommunicator._getAllRecords();
		},

		/**
		* Updates multiple records' value to indexedDB.
		*
		* @public
		* @method updateMultipleRecords
		* @param {Array} 		records 	array of record objects
		* @returns {Function}					Promise function
		* @author bivanov
		*/
		updateMultipleRecords (records) {
			return LocalDBCommunicator._addMultipleRecords(records);
		},
		
		/**
		* Updates a given record's value to indexedDB.
		*
		* @public
		* @method updateRecord
		* @param {Object} 		record	 	record objects
		* @returns {Function} 					Promise function
		* @author bivanov
		*/
		updateRecord (record) {
			return LocalDBCommunicator._addRecord(record);
		}
	}
};

/**
* Creates connection to indexedDB.
*
* @public
* @method dbOpenPromise
* @param {Object} 		options	 	config object
* @returns {Function} 					Promise function
* @author bivanov
*/
function dbOpenPromise (options = {}) {
  return new Promise((resolve, reject) => {
		if (!window.indexedDB) {
			reject("Your browser doesn't support a stable version of IndexedDB!");
		} else {
			if (options.version) {
				LocalDBCommunicator.version = options.version;
			}
			LocalDBCommunicator.AdvancedFormsDB = indexedDB.open(LocalDBCommunicator.DATABASE_NAME, LocalDBCommunicator.version);
			
			LocalDBCommunicator.AdvancedFormsDB.onsuccess = () => {
				LocalDBCommunicator._onsuccessHandler().then(() => {
					resolve(LocalDBCommunicator.external);
				}).catch((error) => {
					console.error(error);
				});
			}
			LocalDBCommunicator.AdvancedFormsDB.onerror = (event) => {
				console.error("onerror", event);
				reject("Error while opening the local database!");
			};
			LocalDBCommunicator.AdvancedFormsDB.onblocked = (event) => {
				console.error("onblocked", event);
			};
			LocalDBCommunicator.AdvancedFormsDB.onupgradeneeded = LocalDBCommunicator._upgradeneededHandler;
			window.addEventListener('unhandledrejection', (event) => {
				console.error(event);
			});
		}
  });
};

export default dbOpenPromise;