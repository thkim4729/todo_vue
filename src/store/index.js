import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
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
        //-------------------------------------------------------------------------------------------
        // 새로고침해도 저장된 값 없어지지 않게 하기
        initializeStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
            }
        }, //-----------------------------------------------------------------------------------------
    },
    actions: {},
    modules: {},
});
// 새로고침해도 저장된 값 없어지지 않게 하기
store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
});
//-------------------------------------------------------
export default store;
