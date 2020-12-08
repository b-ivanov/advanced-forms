import { createWebHistory, createRouter } from "vue-router";
import ViewsConfig from "../assets/js/ViewsConfig.js";

const viewConf = new ViewsConfig();
const routes = viewConf.getRoutes();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;