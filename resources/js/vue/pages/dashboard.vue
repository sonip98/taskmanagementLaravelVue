<template>
    <div class="container">        
        <h1>Dashboard</h1>
        <TaskInput />
        <TaskStatus />
        <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
        </div>
        <TaskList v-if="!loading"/>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import TaskInput from "./TaskInput.vue";
import TaskList from "./TaskList.vue";
import TaskStatus from "./TaskStatus.vue";
import { onMounted } from "vue";


export default {
    components: {
        TaskInput,
        TaskList,
        TaskStatus
    },
    setup(){
        const loading = ref('true');
        const store = useStore();
        const config = {
            headers: { Authorization: `Bearer ${store.getters.getToken}` }
        };
        
        onMounted(async () => {
            await axios.get('/api/items', config).then(res=>{
                var tasksJson = [];

                res.data.forEach( (task) => {
                    tasksJson.push({
                        id: task.id,
                        title: task.name,
                        complete: task.completed
                    })
                });
                
                store.dispatch('loadTasks', tasksJson);
                loading.value = false;
            }).catch(e=>{
                // errors.value = e.response.data.message;
            })

            await axios.get('/api/users', config).then(res=>{
                var namesJson = [];

                res.data.forEach( (user) => {
                    namesJson.push({
                        id: user.id,
                        name: user.name
                    })
                });
                
                store.dispatch('loadUsers', namesJson);
            }).catch(e=>{
                // errors.value = e.response.data.message;
            })
        })

        return {
            loading
        }
    }
}
</script>

<style>
.container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>