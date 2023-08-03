<template>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
        <!-- <router-link :to="{ name: 'Home'}" class="navbar-brand">Home</router-link> -->
        <ul class="navbar-nav  justify-content-center">
            <li class="navbar-item">
                <router-link :to="{ name: 'Login'}" class="text-white" v-if="$store.getters.getToken == 0">Login</router-link>
            </li>
            <li class="navbar-item">
                <router-link :to="{ name: 'Register'}" class="text-white" v-if="$store.getters.getToken == 0">Register</router-link>
            </li>
            <!-- <li class="navbar-item"> -->
                <!-- <router-link :to="{ name: 'Dashboard'}" class="text-white ml-2" v-if="$store.getters.getToken != 0">Dashboard</router-link> -->
            <!-- </li> -->
        </ul>
        <button type="button" class="text-white ml-2 btn" @click="logout" v-if="$store.getters.getToken != 0">Logout</button>
        
    </nav>

    <router-view></router-view>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
export default {
    setup(){
        const router = useRouter();
        const store = useStore();
        function logout() {
            store.dispatch('removeToken');            
            router.push({name: 'Home'});
        }

        return {
            logout,
        }
    }
}
</script>

<style>
.navbar-item {
    margin-left: 10px;
}

@media only screen and (max-width: 600px) {
    .navbar-item {
        margin-left: 0px;
    }
  }

</style>