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
          <button @click="updateTaskI(task)" class="btn border-dark mx-2">{{data.editing?'Update':'Edit'}}</button>
          <button @click="cancelEditing()" class="btn border border-dark mx-2" v-show="data.editing">Cancel</button>
          <button @click="deleteTask(task.id)" class="btn btn-dark">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from "vuex";
  import { reactive, ref } from "vue";
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  export default {
    props: {
      task: {}
    },

    setup(props) {
        const store = useStore();
        const $toast = useToast();

        let data = reactive({
            taskText: "",
            editing: false,
            completed: props.task.complete
        })
        var tempStatus = false;
        const onCompleted = () => {
            tempStatus = data.completed;
            data.completed = data.completed == true ? false : true;
        };

        const updateTaskI = async(task) => {
            data.editing = data.editing == true ? false : true;
            if (data.editing) {
                data.taskText = task.title;
                store.dispatch('updateTask', task);
            } else {
                let json = {
                    "completed":data.completed,
                    "name":data.taskText
                };
                await axios.put(`/api/item/${task.id}`, json).then(res=>{
                    task.title = data.taskText;
                    task.complete = data.completed;
                    tempStatus = data.completed;
                    store.dispatch('changeCompleted', tempStatus)
                    $toast.success('Task updated!');                    
                })
            }
        }

        const cancelEditing = () => {
            data.completed = data.completed == tempStatus ? data.completed : tempStatus;
            data.editing = data.editing == true ? false : true;
        }

        const deleteTask = async(id) => {
            await axios.delete(`/api/item/${id}`).then(res=>{
                store.dispatch('deleteTask', id);
                $toast.success('Task deleted!');
            })
        }
       

        return {
            data,
            onCompleted,
            updateTaskI,
            cancelEditing,
            deleteTask,
        }
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
        margin-top: 0.3em ;
    }

    input {
        margin: 5px
    };
}
  </style>