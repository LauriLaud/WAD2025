import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SignupView from "@/views/SignupView.vue";
import LoginView from '../views/LoginView.vue';
import ContactView from '../views/ContactView.vue';
import iconImg from "@/assets/img/icon.png";
import AddPostView from "@/views/AddPostView.vue";
import APostView from "@/views/APostView.vue";

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
},
{
  path: "/add",
  name: "add-post",
  component: AddPostView,
  meta: {
      title: "Add post",
      icon: iconImg,
	    requiresAuth: true
    }
},
{
  path: "/post/:id",
  name: "a-post",
  component: APostView,
  meta: {
    title: "A Post",
    requiresAuth: true
  }
}
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || "PostIt";
  let favicon = document.querySelector("link[rel='icon']");
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.href = to.meta.icon || iconImg;

  const authRequired = to.matched.some(record => record.meta.requiresAuth);

  if (!authRequired) {
    return next();
  }

  try {
    const res = await fetch("http://localhost:3000/auth/authenticate", {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();

    if (data.authenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  } catch {
    next({ name: "login" });
  }
});




export default router;
