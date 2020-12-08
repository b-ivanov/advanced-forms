import Home from "@/components/views/Home.vue";
import ViewConstructor from "@/components/views/ViewConstructor.vue";

/**
* Class for maintaining the list of views of the single page application.
*
* @class ViewsConfig
* @constructor
* @uses Home.vue
* @uses ViewConstructor.vue
* @author bivanov
*/
class ViewsConfig {
	constructor () {
		this.views = {
			Home: {
				path: "/",
				sidebar: null,
				headerName: null,
				component: Home,
				isHeaderVisible: false,
				isSidebarVisible: false,
				registerAsRoute: true
			},
			Login: {
				path: "/login",
				sidebar: null,
				headerName: null,
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: false,
				registerAsRoute: true
			},
			Register: {
				path: "/register",
				sidebar: null,
				headerName: "NavigationListMiddle",
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: false,
				registerAsRoute: true
			},
			VerifyEmail: {
				path: "/verifyemail",
				sidebar: null,
				headerName: null,
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: false,
				registerAsRoute: true
			},
			VerifyAccount: {
				path: "/verifyaccount",
				sidebar: null,
				headerName: null,
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: false,
				registerAsRoute: true
			},
			ActivateAccount: {
				path: "/activation",
				sidebar: "Аctivation",
				headerName: "NavigationListInSystem",
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: true,
				registerAsRoute: true
			},
			BusinessDetails: {
				path: "/businessdetails",
				sidebar: "Аctivation",
				headerName: "NavigationListInSystem",
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: true,
				registerAsRoute: true
			},
			BusinessRepresentative: {
				path: "/businessrepresentative",
				sidebar: "Аctivation",
				headerName: "NavigationListInSystem",
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: true,
				registerAsRoute: true
			},
			NotFound: {
				path: "/:catchAll(.*)",
				sidebar: null,
				headerName: null,
				component: ViewConstructor,
				isHeaderVisible: true,
				isSidebarVisible: false,
				registerAsRoute: true
			}
		};
	};

	/**
	* Returns valid routes array for the Vue router.
	*
	* @method getRoutes
	* @returns {Array} array of routes
	* @author bivanov
	*/
	getRoutes () {
		let routes = [];
		for (var name in this.views) {
			if (this.views[name] && this.views[name].registerAsRoute) {
				routes.push({
					name: name,
					path: this.views[name].path,
					component: this.views[name].component
				});
			}
		}
		return routes;
	};

	/**
	* Returns true if route should be included in the Vue router, else false.
	*
	* @method isValidRoute
	* @param {String} 		path	route path
	* @returns {Boolean} 				is route valid
	* @author bivanov
	*/
	isValidRoute (path) {
		for (var name in this.views) {
			if (this.views[name] && this.views[name].path === path && this.views[name].registerAsRoute) {
				return true;
			}
		}
		return false;
	};

	/**
	* Returns a config object for a given path.
	*
	* @method getPropertiesForView
	* @param {String} 	pathname	current path
	* @returns {Object} 					config object
	* @author bivanov
	*/
	getPropertiesForView (pathname) {
		if (pathname[0] !== "/") {
			pathname = "/" + pathname;
		}
		for (var name in this.views) {
			if (this.views[name].path === pathname) {
				return {
					name: name,
					sidebarName: this.views[name].sidebar,
					headerName: this.views[name].headerName,
					isHeaderVisible: this.views[name].isHeaderVisible,
					isSidebarVisible: this.views[name].isSidebarVisible
				};
			}
		}
		return {
			name: "NotFound",
			sidebarName: this.views.NotFound.sidebar,
			headerName: this.views.NotFound.headerName,
			isHeaderVisible: this.views.NotFound.isHeaderVisible,
			isSidebarVisible: this.views.NotFound.isSidebarVisible
		};
	};
}

export default ViewsConfig;