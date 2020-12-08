/**
* Class for tracking user interactons. If the user does not make an interaction (mouse move, key press) for a given time, a provided callback function is called.
*
* @class IdleTimer
* @constructor
* @author bivanov
*/
class IdleTimer {
	constructor (options = {}) {
		this.timeoutRef = null;
		this.callback = options.callback || console.warn;
		this.htmlElement = options.htmlElement || document.body;
		this.events = options.events || ['mousemove', 'keydown', 'mousedown', 'touchstart'];
		this.idleTime = options.idleTime || 900000;
		this.autoStart = (options.autoStart === false ? false : true);

		if (this.autoStart) {
			this._start();
		}
	};

	/**
	* Calls functions for attaching event listeners and starting the timer.
	*
	* @method _start
	* @author bivanov
	*/
	_start () {
		this.attachEvents();
		this.start();
	};

	/**
	* Starts the timer.
	*
	* @method start
	* @author bivanov
	*/
	start () {
		const _this = this;
		_this.timeoutRef = setTimeout(() => {
			_this.callback("Idle timer ran out after " + this.idleTime + " miliseconds");
		}, _this.idleTime);
	};

	/**
	* Calls functions for stoping and starting the timer.
	*
	* @method refresh
	* @author bivanov
	*/
	refresh () {
		this.stop();
		this.start();
	};

	/**
	* Stops the timer.
	*
	* @method stop
	* @author bivanov
	*/
	stop () {
		clearTimeout(this.timeoutRef);
		this.timeoutRef = null;
	};

	/**
	* Attaches event liteners and adds an attribute (flag) to the specified HTML element to avoid double attaching.
	*
	* @method attachEvents
	* @author bivanov
	*/
	attachEvents () {
		const _this = this;
		const element = _this.htmlElement;
		if (element.getAttribute("data-idleTimer-attached") === null) {
			for (let i = 0; i < _this.events.length; i++) {
				element.addEventListener(_this.events[i], () => {
					_this.refresh();
				});
			}
			element.setAttribute("data-idleTimer-attached", true);
		}
	};
}

export default IdleTimer;