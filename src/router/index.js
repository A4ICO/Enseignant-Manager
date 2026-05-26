import BilanView from "@/views/BilanView.vue";
import AjoutView from "@/views/AjoutView.vue";
import LoginView from "@/views/LoginView.vue";
import ListeView from "@/views/ListeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
        path: '/',
        name: 'Bilan',
        component: BilanView,
    },
    {
        path: '/ajout',
        name: 'Ajout',
        component: AjoutView,
    },
    {
        path: '/liste',
        name: 'Liste',
        component: ListeView,
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    }
  ],
})

export default router
