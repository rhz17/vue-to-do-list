import Vue from "vue";
import VueRouter from "vue-router";

// Import all views to vue router
import Auth from "../views/Auth.vue";
import List from "../views/List.vue";

Vue.use(VueRouter);

// Create object array with routers
const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
