<template>
    <v-row class="music" justify="center" no-gutters>
        <div class="music-content">
            <v-row class="music-top" justify="center" no-gutters>
                <h1 class="music-title" @click="reload"><router-link to="/">Music</router-link></h1>
                <v-spacer></v-spacer>
                <p class="todo-time">{{ formatDate }}</p>
            </v-row>
            <v-row class="music-player" no-gutters justify="flex-start" align="center">
                <iframe
                    id="player"
                    type="text/html"
                    width="640"
                    height="360"
                    src="https://www.youtube.com/embed/lKQG8JwmDvI"
                    frameborder="0"
                ></iframe>
            </v-row>
        </div>
    </v-row>
</template>

<script>
export default {
    name: 'Music',
    data() {
        return {};
    },
    methods: {
        reload() {
            location.reload();
        },
    },
    computed: {},
};
</script>

<style lang="scss" scoped>
.music {
}
.music-content {
    width: 100%;
    max-width: 700px;
    // height: 100vh;
    background-color: #e3f2fd;
    padding: 48px 0;
}
.music-top {
    align-items: flex-end;
}
.music-title {
    font-size: 64px;
    color: skyblue;
    font-weight: 400;
    padding: 0 0 0 16px;
    a {
        text-decoration: none;
    }
}
iframe {
    width: 100%;
    max-width: 640px;
}
.music-player {
    min-width: 640px;
    // max-width: 800px;
    // height: 100vh;
    background-color: #e3f2fd;
    margin: 0 auto;
}
</style>
