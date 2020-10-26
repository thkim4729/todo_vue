import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
    // 새로고침 해도 로컬스토어에 저장한 값 유지하기
    beforeCreate() {
        this.$store.commit('initializeStore');
    },
    //------------------------------------------
}).$mount('#app');
