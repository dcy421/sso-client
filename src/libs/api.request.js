import HttpRequest from '@/libs/axios'
// 多环境
const baseUrl = '/api';

const axios = new HttpRequest(baseUrl)
export default axios
