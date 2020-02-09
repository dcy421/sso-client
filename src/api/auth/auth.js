import axios from '@/libs/api.request'
import Config from "../../libs/auth/config";


/**
 * 根据 code 获取access_token
 * @returns {http.ClientRequest | ClientHttp2Stream | * | AxiosPromise<any>}
 */
export const getAccessTokenByCode = (code) =>{
    return axios.request({
        baseURL:'/auth-api',
        url: '/oauth/token',
        method: 'post',
        params: {
            grant_type:'authorization_code',
            code:code,
            client_id:Config.clientId,
            client_secret:Config.clientSecret,
            redirect_uri:Config.baseUrl
        }
    })
}

/**
 * 刷新token
 * @param refreshToken
 * @returns {http.ClientRequest | ClientHttp2Stream | * | AxiosPromise<any>}
 */
export const refreshToken = (refreshToken) =>{
    return axios.request({
        baseURL:'/auth-api',
        url: '/oauth/token',
        method: 'post',
        params: {
            grant_type:'refresh_token',
            refresh_token:refreshToken,
            client_id:Config.clientId,
            client_secret:Config.clientSecret
        }
    })
}