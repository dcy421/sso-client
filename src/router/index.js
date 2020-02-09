import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import {getParam} from "../libs/auth/url";
import Constant from "../libs/auth/config";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        }
    ]
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach(async (to, from, next) => {
    // 授权获取token
    let code = getParam('code');
    if (code) {
        // 根据code 获取token
        await store.dispatch('auth/getAccessTokenByCode', code)
    } else if (getParam('logout') === 'yes') {
        await store.dispatch('auth/deleteToken')
    } else {
        if (store.getters.isLogin) {
            if (store.getters.isExpires) {
                await store.dispatch('auth/refreshToken')
            } else {
                next()
            }
        } else {
            window.location.href = `${Constant.authUrl}oauth/authorize?response_type=code&client_id=${Constant.clientId}&redirect_uri=${Constant.baseUrl}`
        }
    }
});

export default router;
