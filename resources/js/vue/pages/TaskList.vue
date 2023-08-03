<template>
    <div>
        <div v-for="task in allTTasks" :key="task.id">
            <TaskItem :task="task" />
        </div>
    </div>
</template>
  
<script>
import TaskItem from "./TaskItem.vue";
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    components: {
        TaskItem
    },
    setup() {
        const store = useStore();

        const completed = computed(() => {
            return store.getters.completed;
        })

        const allTTasks = computed(() => {
            return store.getters.allTTasks;
        })

        return {
            completed,
            allTTasks
        }
    }
};
</script>
  
<style scoped></style>