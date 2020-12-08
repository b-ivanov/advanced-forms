<template>
	<!-- <router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component"/>
		</transition>
	</router-view> -->
	<router-view/>
	<Modal/>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router';
import ViewsConfig from "@/assets/js/ViewsConfig.js";
import IdleTimer from '@/assets/js/IdleTimer.js';
import ServerCommunicator from '@/assets/js/services/ServerCommunicator.js';
import Modal from './utilities/Modal.vue';
/**
* The component uses the Vue router to navigate to different views of the application and attaches system event listeners.
*
* @component Root
* @uses vue.js
* @uses vue-router.js
* @uses ViewsConfig.js
* @uses IdleTimer.js
* @uses ServerCommunicator.js
* @uses Modal.vue
* @author bivanov
*/
export default {
	name: 'Root',
	components: {
		Modal
	},
	setup () {
		/**
		* Аttaches system event listeners.
		*
		* @method anonymous
		* @author bivanov
		*/
		onMounted(() => {
			const { proxy } = getCurrentInstance();
			const router = useRouter();
			const ServerComm = new ServerCommunicator({
				origin: "http://10.50.0.41"
				// origin: "http://192.168.13.246"
			});
			/*const autoLogoutTimer = new IdleTimer({
				idleTime: 3000,
				callback: (message) => {
					router.push("login");
				}
			});*/

			/**
			 * Fired when a data has to be retrieved from the server.
			 *
			 * @event data-transmition-event
			 * @param {Object}								options	configuration object containing url, method, data for request and a callback function when data is retrieved
			 * @author bivanov
			 */
			proxy.eventBus.on('data-transmition-event', (options) => {
				ServerComm.sendRequest(options).then((data) => {
					options.callback(data);
				}).catch(function(err) {
					console.error('Server communication Error:', err);
				});
			});

			/**
			 * Fired when the user's access token is changed.
			 *
			 * @event token-refresh-event
			 * @param {String}								token	new user token to store in the local indexedDB
			 * @author bivanov
			 */
			proxy.eventBus.on('token-refresh-event', (token) => {
				ServerComm.addHeaders({
					Authorization: 'Bearer ' + token
				});
			});
			
			/**
			 * Fired when theuser interface needs to change.
			 *
			 * @event router-navigation-event'
			 * @param {Object}								options	ID of new user interface
			 * @author bivanov
			 */
			proxy.eventBus.on('router-navigation-event', (options) => {
				router.push(options.url);
			});
		});

		return {};
	}
}
</script>