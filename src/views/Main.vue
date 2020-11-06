<template>
    <v-row class="main" no-gutters justify="space-around">
        <!-- <v-col cols="6" sm="12"> -->
        <todo class="todo"></todo>
        <music class="music"></music>
        <!-- </v-col> -->
    </v-row>
</template>

<script>
export default {
    name: 'main',
    components: {
        Todo: () => import('@/components/main/Todo.vue'),
        Music: () => import('@/components/main/Music.vue'),
    },
    data() {
        return {};
    },
    methods: {},
    computed: {},
};
</script>

<style lang="scss" scoped>
.main {
    flex-flow: row;
    width: 100vw;
    height: 100vh;
    .todo {
        width: 50%;
    }
    .music {
        width: 50%;
    }
}
</style>
