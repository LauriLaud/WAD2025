import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SignupView from "@/views/SignupView.vue";
import iconImg from "@/assets/img/icon.png";

const routes = [
{
path: "/",
name: "home",
component: HomeView,
meta: {
      title: "Home",
      icon: iconImg
    }
},
{
path: "/signup",
name: "signup",
component: SignupView,
meta: {
      title: "Sign Up",
      icon: iconImg
    }
}
];


const router = createRouter({
history: createWebHashHistory(),
routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "PostIt";

  let favicon = document.querySelector("link[rel='icon']");
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.href = to.meta.icon;

  next();
});



export default router;
