<template>
    <div>
        <p class="text-danger" v-if="errors && textVisible" v-for="error in errors" :key="error">
            <span v-for="err in error" :key="err">{{ err }}</span>
        </p>
        <span v-if="response && textVisible" class="text-success">{{ response }}</span>
        <div class="row">
            <input v-model="task.title" class="col form-control mr-2" type="text" />
            <button @click="addTaskI" class="btn btn-dark">Add</button>
        </div>
    </div>
</template>
  
<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default {
    setup() {
        let task = reactive({
            title: '',
        });

        const textVisible = ref(false)
        const showText = () => {
            textVisible.value = true

            setTimeout(() => {
                textVisible.value = false
            }, 3000)
        }

        let errors = ref([]);

        let response = ref('');

        const store = useStore();
        const $toast = useToast();


        const addTaskI = async () => {
            errors.value = [];
            response.value = '';
            await axios.post('/api/item/store', task).then(res => {
                if (res.data.success) {
                    let taskJson = {
                        id: res.data.data.id,
                        title: res.data.data.name,
                        complete: false
                    }
                    store.dispatch('addTask', taskJson);
                    task.title = '';
                    $toast.success('Task added!');
                }
            }).catch(e => {
                errors.value = e.response.data.message;
                showText();
                $toast.error('Not added text!');
            })
        }

        return {
            task,
            addTaskI,
            errors,
            textVisible
        };
    }
};
</script>
  
<style scoped>
@media only screen and (max-width: 600px) {
    .row {
        flex-direction: column;
    }

    button {
        width: fit-content;
        margin: auto;
        margin-top: 1em ;
    }

    input {
        margin: 5px
    };
}
</style>