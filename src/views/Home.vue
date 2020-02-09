<template>
    <div class="home">
        <h2>首页</h2>
        <button @click="logout()">退出</button>
        <button @click="toBaidu()">跳转百度</button>
    </div>
</template>

<script>

    import {mapActions} from "vuex";

    export default {
        name: 'home',
        methods: {
            ...mapActions('auth', ['deleteToken']),
            toBaidu() {
                window.location.replace(`http://localhost:7777/oauth/authorize?response_type=code&client_id=baidu&redirect_uri=https://www.baidu.com/`)
            },
            logout() {
                this.deleteToken()
            }
        },
    }
</script>
