<template>
    <div>
      <div class="row my-3 justify-content-between align-items-center">
        <h3 v-if="!data.editing">{{task.title}}</h3>
  
        <div v-else class="mr-2 row justify-content-between align-items-center col">
          <input
            v-model="data.taskText"
            type="text"
            class="col-7 form-control"
          />
          <div>
            <input :checked="data.completed" class="mr-1" @change="onCompleted" type="checkbox" />
            <label class>Completed</label>
          </div>
        </div>
        <div class="row align-items-center">
          <button @click="updateTaskI(task)" class="btn btn-primary mx-2">{{data.editing?'Update':'Edit'}}</button>
          <button @click="cancelEditing()" class="btn btn-primary mx-2" v-show="data.editing">Cancel</button>
          <button @click="deleteTask(task.id)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from "vuex";
  import { reactive } from "vue";
  export default {
    props: {
      task: {}
    },

    setup(props) {
        const store = useStore();

        let data = reactive({
            taskText: "",
            editing: false,
            completed: props.task.complete
        })
        var tempStatus = null;
        const onCompleted = () => {
            tempStatus = data.completed;
            data.completed = data.completed == true ? false : true;
        };

        const updateTaskI = async(task) => {
            data.editing = data.editing == true ? false : true;
            if (data.editing) {
                console.log("test in editing")
                data.taskText = task.title;
                store.dispatch('updateTask', task);
            } else {
                await axios.put(`/api/item/${task.id}`, {"completed":data.completed}).then(res=>{
                    // if(res.data.success){
                        //     store.dispatch('setToken', res.data.data.token);
                        //     router.push({name: 'Dashboard'});
                        // }
                    task.title = data.taskText;
                    task.complete = data.completed;
                    tempStatus = data.completed;
                    store.dispatch('changeCompleted', !data.completed);
                })
            }
        }

        const cancelEditing = () => {
            data.completed = data.completed == tempStatus ? null : tempStatus;
            data.editing = data.editing == true ? false : true;
        }

        const deleteTask = async(id) => {
            await axios.delete(`/api/item/${id}`).then(res=>{
                store.dispatch('deleteTask', id);
            })
        }

        return {
            data,
            onCompleted,
            updateTaskI,
            cancelEditing,
            deleteTask
        }
    }
  };
  </script>
  
  <style scoped>
  </style>