<template>
    <div class="main">
        <search></search>
    </div>
</template>

<script>
export default {
    name: 'main',
    components: {
        Search: () => import('@/components/main/Search.vue'),
    },
    data() {
        return {};
    },
    methods: {},
    computed: {},
};
</script>

<style lang="scss" scoped></style>
