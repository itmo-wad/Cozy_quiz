import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import Quiz from "../views/Quiz.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/editor/",
    name: "Editor",
    component: Editor,
  },
  {
    path: "/quiz/",
    name: "Quiz",
    component: Quiz,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
