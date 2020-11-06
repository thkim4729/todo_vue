<template>
    <v-row class="todo" justify="center" no-gutters>
        <div class="todo-content">
            <v-row class="todo-top" justify="center" no-gutters>
                <h1 class="todo-title" @click="reload"><router-link to="/">Todos</router-link></h1>
                <v-spacer></v-spacer>
                <p class="todo-time">{{ formatDate }}</p>
            </v-row>

            <v-card elevation="10">
                <v-text-field
                    class="todo-text-field"
                    placeholder="What needs to be done?"
                    height="60"
                    flat
                    solo
                    hide-details
                    prepend-inner-icon="mdi-chevron-down"
                    @keyup.enter="addTask"
                    v-model="newTitle"
                ></v-text-field>
                <v-btn class="todo-search-btn" color="primary" text small absolute
                    ><v-icon class="todo-search-icon" small @click="addTask">ADD</v-icon></v-btn
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
                <v-row class="todo-footer" justify="center" align="center" no-gutters>
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
                    <v-btn text small class="clear-btn" color="error" @click="clearAll()"
                        >All Clear</v-btn
                    >
                </v-row>
            </v-card>
        </div>
    </v-row>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import moment from 'moment';
export default {
    name: 'Todo',
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
        formatDate() {
            let created = moment(this.date);
            // console.log(moment().unix());
            return created.format('YYYY.MM.D dddd h:mm a');
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
        clearAll() {
            this.$store.commit('clearAll');
        },
        reload() {
            location.reload();
        },
    },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    /* 스크롤바 전체 영역 */
    width: 8px;
}
::-webkit-scrollbar-track {
    /* 스크롤이 움직이는 영역  */
    background-color: #f9f9f9;
}
::-webkit-scrollbar-thumb {
    /*  스크롤  */
    background-color: #aaa;
    border-radius: 30px;
}
::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment {
    /*  스크롤의 화살표가 포함된 영역   */
    // display: block;
    // height: 10px;
    // background-color: gray;
}
::-webkit-scrollbar-corner {
    /*  상하+좌우 스크롤이 만나는 공간   */
    background-color: red;
}
.todo {
    background: #e3f2fd;
}
.todo-content {
    width: 100%;
    max-width: 700px;
    // height: 100vh;
    background-color: #e3f2fd;
    padding: 48px;
    .todo-top {
        align-items: flex-end;
    }
}
.todo-search-btn {
    right: -17px;
    top: 17px;
    transform: translateY(-50%);
    transform: translateX(-50%);
    font-style: normal;
}
.todo-search-icon {
    font-style: normal;
}
.todo-title {
    font-size: 64px;
    color: skyblue;
    font-weight: 400;
    padding: 0 0 0 16px;
    a {
        text-decoration: none;
    }
}
.todo-time {
    padding: 0 16px 0 0;
}
.todo-text-field {
    max-height: 80px !important;
}
.todo-list {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
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
.todo-footer {
    position: relative;
    height: 40px;
    p {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
    }
    .clear-btn {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
.text-complete {
    text-decoration: line-through;
    opacity: 0.5;
}
</style>
