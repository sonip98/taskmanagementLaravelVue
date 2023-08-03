<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">

                <h2>Login</h2>
                <p class="text-danger" v-if="error">{{error}}</p>

                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email Address:</label>
                        <input type="email" id="email" class="form-control" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" class="form-control" v-model="form.password">
                    </div>
                    <button type="submit" class="btn btn-dark">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default {
    setup(){
        let form = reactive({
            email: '',
            password: ''
        });

        const $toast = useToast();        

        const router = useRouter();
        const store = useStore();

        let error = ref('')

        const login = async() =>{
            await axios.post('/api/login', form).then(res=>{
                if(res.data.success){
                    store.dispatch('setToken', res.data.data.token);
                    router.push({name: 'Dashboard'});
                    $toast.success('Logged in!');
                }else {
                    error.value = res.data.message;
                }
            })
        }

        return{
            form,
            login,
            error
        }
    }
}
</script>