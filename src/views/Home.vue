<template>
    <!-- http://todomvc.com/examples/vue/#/all -->
    <v-row class="home" justify="center">
        <div class="home-content">
            <router-link to="/"><h1 @click="reload">todos</h1></router-link>

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
                <v-btn class="todo-search-btn" color="primary" text small absolute
                    ><v-icon class="todo-search-icon" small @click="addTask">검색</v-icon></v-btn
                >
                <div class="todo-list">
                    <v-row
                        align="center"
                        class="list-item"
                        v-for="(todo, i) in filteredTodos"
                        :key="i"
                        @mouseover="todo.hover = true"
                        @mouseleave="todo.hover = false"
                    >
                        <div
                            :class="{ 'blue-border': todo.complete }"
                            class="circle"
                            @click="editTask(todo)"
                        >
                            <v-btn icon large v-show="todo.complete" color="primary">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </div>
                        <p :class="{ 'text-complete': todo.complete }">
                            {{ todo.title }}
                        </p>
                        <v-spacer></v-spacer>
                        <v-btn icon large @click="deleteTask(todo)"
                            ><v-icon>mdi-close</v-icon></v-btn
                        >
                    </v-row>
                </div>
                <v-divider></v-divider>
                <v-row class="todo-footer-extension" justify="center" align="center" no-gutters>
                    <p>{{ filteredTodos.length }} item left</p>
                    <v-btn text small :outlined="filter === 'all'" @click="filter = 'all'"
                        >all</v-btn
                    >
                    <v-btn text small :outlined="filter === 'active'" @click="filter = 'active'"
                        >active</v-btn
                    >
                    <v-btn
                        text
                        small
                        :outlined="filter === 'completed'"
                        @click="filter = 'completed'"
                        >completed</v-btn
                    >
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
        filteredTodos() {
            switch (this.filter) {
                case 'active':
                    return this.todos.filter((el) => !el.complete);
                case 'completed':
                    return this.todos.filter((el) => el.complete);
                default:
                    return this.todos;
            }
        },
        newId() {
            return (
                this.todos.reduce((acc, cur) => {
                    return Math.max(acc, cur.id);
                }, 0) + 1
            );
        },
    },
    data() {
        return { newTitle: '', filter: '' };
    },
    methods: {
        addTask() {
            this.$store.commit('addTask', {
                id: this.newId,
                complete: false,
                title: this.newTitle,
            });
            this.newTitle = '';
        },
        editTask(task) {
            task.complete = !task.complete;
            this.$store.commit('editTask', task);
        },
        deleteTask(task) {
            this.$store.commit('deleteTask', task);
        },
        reload() {
            location.reload();
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
    // height: 100vh;
    background-color: #f5f5f5;
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
    max-height: 80px !important;
}
.list-item {
    padding: 10px 16px;
    .blue-border {
        border: 1px solid rgb(0, 132, 255) !important;
    }
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
    height: 40px;
    p {
        position: absolute;
        left: 10px;
        top: 12px;
        font-size: 12px;
    }
}
.text-complete {
    text-decoration: line-through;
    opacity: 0.5;
}
</style>
