<template>
    <div>
        <p class="text-danger" v-for="error in errors" :key="error">
            <span v-for="err in error" :key="err">{{err}}</span>
        </p>
        <div class="row">
        <input
          v-model="task.title"
          class="col form-control mr-2"
          type="text"
        />
        <button @click="addTaskI" class="btn btn-primary">Add</button>
      </div>
    </div>
</template>
  
  <script>
//   import { mapActions } from "vuex";
//   import { v1 } from "uuid";
  import { reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    // methods: {
    //   ...mapActions(["addTask"]),
    //   taskTextChange(e) {
    //     this.taskText = e.target.value;
    //   },
  
    //   addTaskI() {
    //     this.addTask({
    //       id: v1(),
    //       title: this.taskText,
    //       complete: false
    //     });
    //     this.taskText = "";
    //   }
    // }
    setup(){
        let task = reactive({
            title: '',
        });

        let errors = ref([])

        const store = useStore();
        
        const addTaskI = async() =>{
            await axios.post('/api/item/store', task).then(res=>{
                if(res.data.success){                    
                    let taskJson = {
                        id: res.data.data.id,
                        title: res.data.data.name,
                        complete: false
                    }
                    store.dispatch('addTask', taskJson);
                    task.title = '';
                }
            }).catch(e=>{
                errors.value = e.response.data.message;
            })
        }

        return {
            task,
            addTaskI,
            errors
        };
    }
  };
  </script>
  
  <style scoped>
  </style>