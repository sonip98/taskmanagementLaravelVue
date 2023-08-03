<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6 mt-4">
                <h2>Register</h2>
                <p class="text-danger" v-for="error in errors" :key="error">
                    <span v-for="err in error" :key="err">{{err}}</span>
                </p>

                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="name">Full name:</label>
                        <input type="text" id="name" class="form-control" v-model="form.name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address:</label>
                        <input type="email" id="email" class="form-control" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" class="form-control" v-model="form.password">
                    </div>
                    <div class="form-group">
                        <label for="c_password">Confirm Password:</label>
                        <input type="password" id="c_password" class="form-control" v-model="form.c_password">
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
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
            name: '',
            email: '',
            password: '',
            c_password:''
        });

        const $toast = useToast();

        const router = useRouter();
        const store = useStore();

        let errors = ref([])

        const register = async() =>{
            await axios.post('/api/register', form).then(res=>{
                if(res.data.success){
                    store.dispatch('setToken', res.data.data.token);
                    router.push({name: 'Dashboard'});
                    $toast.success('Registered and logged in!');
                }
            }).catch(e=>{
                errors.value = e.response.data.message;
            })
        }

        return{
            form,
            register,
            errors
        }
    }
}
</script>