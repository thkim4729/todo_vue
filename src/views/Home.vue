<template>
    <v-row class="home" justify="center">
        <div class="home-content">
            <h1>todos</h1>
            <v-card elevation="10">
                <v-text-field
                    class="todo-text-field"
                    placeholder="What needs to be done?"
                    height="80"
                    flat
                    solo
                    prepend-inner-icon="mdi-chevron-down"
                    @keyup.enter="addTask"
                    v-model="newTitle"
                ></v-text-field>
                <v-btn class="todo-search-btn" color="primary" text small absolute><v-icon class="todo-search-icon" small @click="addTask">검색</v-icon></v-btn>
                <div class="todo-list">
                    <v-row align="center" class="list-item" v-for="(todo, i) in todos" :key="i">
                        <div class="circle">
                            <v-btn icon large color="green">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </div>
                        <p>{{ todo.title }}</p>
                        <v-spacer></v-spacer>
                        <v-btn icon large><v-icon>mdi-close</v-icon></v-btn>
                    </v-row>
                </div>
                <v-divider></v-divider>
                <v-row class="todo-footer-extension" justify="center" align="center" no-gutters>
                    <p>{{ todos.length }} item left</p>
                    <v-btn text small outlined>all</v-btn>
                    <v-btn text small>active</v-btn>
                    <v-btn text small>completed</v-btn>
                </v-row>
            </v-card>
        </div>
    </v-row>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: {},
    computed: {
        ...mapState(['todos']),
        newId() {
            return (
                this.todos.reduce((acc, cur) => {
                    return Math.max(acc, cur.id);
                }, 0) + 1
            );
        },
    },
    data() {
        return { newTitle: '' };
    },
    methods: {
        addTask() {
            this.$store.commit('addTask', {
                id: this.newId,
                complete: false,
                title: this.newTitle,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.home {
    background: #f5f5f5;
}
.home-content {
    width: 100%;
    max-width: 800px;
    height: 100vh;
    background-color: #fff;
    padding: 48px;
}
.todo-search-btn {
    right: 0;
    top: 25px;
    transform: translateY(-50%);
    transform: translateX(-50%);
    font-style: normal;
}
.todo-search-icon {
    font-style: normal;
}
h1 {
    font-size: 100px;
    text-align: center;
    color: pink;
    font-weight: 400;
    margin-bottom: 24px;
}
.todo-text-field {
    height: 80px;
}
.list-item {
    padding: 10px 16px;
    .circle {
        width: 45px;
        height: 45px;
        border-radius: 23px;
        border: 1px solid #eee;
    }
    p {
        margin: 0 0 0 20px;
        font-size: 16px;
        font-weight: 400;
    }
}
.todo-footer-extension {
    position: relative;
    p {
        position: absolute;
        left: 10px;
        top: 5px;
        font-size: 12px;
    }
}
</style>
