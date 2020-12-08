/**
* Class for creating a connection to a given server address. The class ensures that each request send out is in the required data format and has all the headers for authentication.
*
* @class ServerCommunicator
* @constructor
* @author bivanov
*/
class ServerCommunicator {	
	constructor (options = {}) {
		const initialHeaders = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Origin': '*'
		};
		if (options.origin) {
			this.origin = options.origin + "/";
		} else {
			console.warn("No origin was provided for the ServerCommunicator! Requests will be send to:", location.origin);
			this.origin = location.origin + "/";
		}
		this.headers = { ...initialHeaders, ...options.headers };
	};
	
	/**
	* Creates the required request object by a given config object and calls execution function.
	*
	* @method sendRequest
	* @param {Object} options 	config object for request
	* @returns {Function} 			Promise function
	* @author bivanov
	*/
	async sendRequest (options) {
		const fetchObject = {
			method: options.type,
			headers: this.headers,
		};
		if (options.type === "POST" || options.type === "PUT") {
			fetchObject.body = JSON.stringify(options.data);
		}
		return this.executeRequest(options.path, fetchObject);
	};

	/**
	* Constructs and executes a request by the given path and config object, using Fetch API.
	*
	* @method executeRequest
	* @param {String} path 			path for request
	* @param {Object} fetchObj 	config object for request
	* @returns {Function} 			Promise function
	* @author bivanov
	*/
	async executeRequest (path, fetchObj) {
		const url = this.origin + path;
		console.log("Sending data to:", url, fetchObj);
		const response = await fetch(url, fetchObj).then((response) => {
			// console.log(response);
			return response.json();
		});
		return response;
	};

	/**
	* Converts data object to GET request string for URL.
	*
	* @method convertObjectToGetReq
	* @param {Object} data 		path for request
	* @returns {String} 			request string for URL
	* @author bivanov
	*/
	convertObjectToGetReq (data) {
		let dataArr = [];
		for (var name in data) {
			dataArr.push(name + "=" + data[name])
		}
		return dataArr.join("&");
	};
	
	/**
	* Returns current headers object used for requests.
	*
	* @method getHeaders
	* @returns {Function} 		headers object 
	* @author bivanov
	*/
	getHeaders () {
		return this.headers;
	};

	/**
	* Adds header entries to header property to be used in future requests.
	*
	* @method addHeaders
	* @param {Object} newHeaders 	new headers object
	* @author bivanov
	*/
	addHeaders (newHeaders) {
		this.headers = { ...this.headers, ...newHeaders };
	};
}

export default ServerCommunicator;