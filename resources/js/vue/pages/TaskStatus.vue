<template>
    <div>
      <ul class="row justify-content-center my-3">
        <li>
          <button @click="changeTab(true)" :class="{active:completed==true}">Completed</button>
        </li>
        <li>
          <button @click="changeTab(false)" :class="{active:completed==false}">Not Completed</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import {computed} from 'vue';
  import { useStore } from 'vuex';
  export default {
    
    setup() {

        const store = useStore();

        const completed = computed(() => {
            return store.getters.completed;
        })

        const changeTab = (status) => {
            store.dispatch('changeCompleted', status);
        } 
        
        return {
            changeTab,
            completed
        }
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    display: flex;
  }
  button {
    outline: none;
    border: none;
    padding: 10px 20px;
    color: #000;
  }
  button:hover {
    outline: none;
    background-color: rgb(194, 243, 227);
  }
  .active {
    outline: none;
    color: white;
    background-color: rgb(0, 202, 135);
  }
  .active:hover {
    outline: none;
    border: none;
    padding: 10px 20px;
    color: white;
    background-color: rgb(0, 202, 135);
  }
  </style>