import Constant from "../libs/auth/constant";
import moment from "moment";

const getters = {
    isLogin: state => localStorage.getItem(Constant.access_token),
    isExpires: state => moment().unix() > localStorage.getItem(Constant.token_expires_time)
}
export default getters
