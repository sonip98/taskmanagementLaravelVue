import { createStore } from "vuex";

const store = createStore({

    state: {
        // define variables
        token: localStorage.getItem('token') || 0,
        completed: false,
        ttasks: [],
        tasks: [],
    },
    mutations: {
        // update variable values
        UPDATE_TOKEN(state, payload) {
            state.token = payload;
        },
        load_tasks(state, tasks){
            state.tasks = tasks;
            state.ttasks = state.tasks;
            state.completed = false;
            state.ttasks = state.ttasks.filter((t) => t.complete == state.completed);
        },
        add_task(state, task) {
            state.tasks.push(task);
            state.ttasks = state.tasks;            
            state.ttasks = state.ttasks.filter((t) => t.complete == false);
        },
        delete_task(state, id) {
            state.tasks = state.tasks.filter((task) => task.id != id);
            state.ttasks = state.tasks;
            state.ttasks = state.ttasks.filter((t) => t.complete == state.completed);
        },
        update_task(state, task) {
            let index = state.tasks.findIndex((t) => t.id == task.id);
            if (index != -1) {
                state.tasks[index] = task;
            }
        },
        change_complete(state, status) {
            state.ttasks = state.tasks;
            state.completed = status;
            state.ttasks = state.ttasks.filter((t) => t.complete == state.completed);
        },
    },
    actions: {
        // action to be performed
        setToken(context, payload) {
            context.commit('UPDATE_TOKEN', payload);
            localStorage.setItem('token', payload);
        },
        removeToken(context) {
            localStorage.removeItem('token');
            context.commit('UPDATE_TOKEN', 0);
        },
        loadTasks(context, tasks) {
            context.commit('load_tasks', tasks)
        },
        changeCompleted(context, status) {
            context.commit("change_complete", status);
        },
        addTask(context, task) {
            context.commit("add_task", task);
        },
        deleteTask(context, id) {
            context.commit("delete_task", id);
        },
        updateTask(context, task) {
            context.commit("update_task", task);
        },
    },
    getters: {
        // get state variable value
        getToken: function (state) {
            return state.token;
        },
        allTTasks: (state) => state.ttasks,
        allTasks: (state) => state.tasks,
        completed: (state) => state.completed,
    }
});

export default store;