import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SignupView from "@/views/SignupView.vue";
import LoginView from '../views/LoginView.vue';
import ContactView from '../views/ContactView.vue';
import iconImg from "@/assets/img/icon.png";

const routes = [
{
path: "/",
name: "home",
component: HomeView,
meta: {
      title: "Home",
      icon: iconImg,
	  requiresAuth: true
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
},
{
    path: '/login',
    name: 'login',
    component: LoginView,
	meta: {
      title: "Login",
      icon: iconImg
    }
},
{
    path: '/contact',
    name: 'contact',
    component: ContactView,
	meta: {
      title: "Contact Us",
      icon: iconImg
    }
}
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // 1. Handle Document Title and Favicon (Your existing logic)
  document.title = to.meta.title || "PostIt";
  let favicon = document.querySelector("link[rel='icon']");
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.href = to.meta.icon || iconImg;

  // 2. Handle Authentication Guard (New logic)
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem("token"); // Check if JWT exists

  if (authRequired && !isAuthenticated) {
    // If page needs auth but user has no token, redirect to Login
    next({ name: "login" });
  } else {
    // Otherwise, allow navigation
    next();
  }
});



export default router;
