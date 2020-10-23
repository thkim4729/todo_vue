import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [],
    },
    mutations: {
        addTask(state, payload) {
            state.todos.push(payload);
        },
        editTask(state, payload) {
            let targetTask = state.todos.find((el) => el.id === payload.id);
            Object.assign(targetTask, payload);
            // targetTask.complete = payload.complete;
            // targetTask.title = payload.title;
        },
        deleteTask(state, payload) {
            let targetTask = state.todos.find((el) => el.id === payload.id);
            let deleteIndex = state.todos.indexOf(targetTask);
            state.todos.splice(deleteIndex, 1);
        },
    },
    actions: {},
    modules: {},
});
