<template>
    <!-- http://todomvc.com/examples/vue/#/all -->
    <v-row class="home" justify="center">
        <core-app-bar class="core-app-bar"></core-app-bar>
        <core-view class="core-view"></core-view>
        <core-footer class="core-footer"></core-footer>
    </v-row>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'Home',
    components: {
        CoreAppBar: () => import('@/components/core/AppBar.vue'),
        CoreView: () => import('@/components/core/View.vue'),
        CoreFooter: () => import('@/components/core/Footer.vue'),
    },
    computed: {},
    data() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.home {
    background: #e3f2fd;
}
</style>
