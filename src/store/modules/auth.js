import {getAccessTokenByCode, refreshToken} from "../../api/auth/auth";
import moment from "moment";
import Config from "../../libs/auth/config";
import Constant from "../../libs/auth/constant";
import Cookies from "js-cookie";

const state = {}

const mutations = {}

const actions = {
    /**
     * 根据code 获取accessToken
     * @param commit
     * @param dispatch
     * @param code
     * @returns {Promise<unknown>}
     */
    getAccessTokenByCode({commit, dispatch}, code) {
        return new Promise((resolve, reject) => {
            getAccessTokenByCode(code).then(res => {
                dispatch('saveToken', res)
                window.location.href = Config.baseUrl;
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /**
     * 刷新token
     * @param commit
     * @returns {Promise<unknown>}
     */
    refreshToken({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem(Constant.refresh_token);
            refreshToken(token).then(res => {
                dispatch('saveToken', res)
                window.location.href = Config.baseUrl;
                resolve()
            }).catch(err => {
                reject(err)
                window.location.href = `${Config.authUrl}oauth/authorize?response_type=code&client_id=${Config.clientId}&redirect_uri=${Config.baseUrl}`
            })
        })
    },
    /**
     * 保存token
     * @param commit
     * @param data
     * @returns {Promise<unknown>}
     */
    saveToken({commit}, data) {
        return new Promise((resolve, reject) => {
            localStorage.setItem(Constant.access_token, data.access_token);
            localStorage.setItem(Constant.refresh_token, data.refresh_token);
            localStorage.setItem(Constant.expires_in, data.expires_in);
            localStorage.setItem(Constant.token_expires_time, moment().add(data.expires_in, 's').unix());
            localStorage.setItem(Constant.user_info, JSON.stringify(data.user_info));
            resolve();
        })

    },
    /**
     * 删除token
     * @param commit
     * @returns {Promise<unknown>}
     */
    deleteToken({commit}) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem(Constant.access_token);
            localStorage.removeItem(Constant.refresh_token);
            localStorage.removeItem(Constant.expires_in);
            localStorage.removeItem(Constant.token_expires_time);
            localStorage.removeItem(Constant.user_info);
            window.location.href = `${Config.authUrl}logout`;
            resolve();
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
