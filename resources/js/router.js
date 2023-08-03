import { createWebHistory, createRouter } from "vue-router";
import home from './vue/pages/home.vue';
import login from './vue/pages/login.vue';
import register from './vue/pages/register.vue';
import dashboard from './vue/pages/dashboard.vue';
import taskinput from './vue/pages/TaskInput.vue';
import store from './vue/store';

const routes = [
    {
        path    : '/',
        name    :   'Home',
        component   : home
    },
    {
        path    : '/login',
        name    :   'Login',
        component   : login,
        meta    :{
            requiresAuth:false
        }
    },
    {
        path    :   '/register',
        name    :   'Register',
        component   : register,
        meta    :{
            requiresAuth:false
        }
    },
    {
        path    :   '/dashboard',
        name    :   'Dashboard',
        component   : dashboard,
        meta    :{
            requiresAuth:true
        }
    },
    {
        path    :   '/taskinput',
        name    :   'TaskInput',
        component   : taskinput,
        meta    :{
            requiresAuth:true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to,from) =>{
    if(to.meta.requiresAuth && store.getters.getToken == 0){
        return { name : 'Login'}
    }
    if(to.meta.requiresAuth==false && store.getters.getToken != 0){
        return { name : 'Dashboard' }
    }
})

export default router;