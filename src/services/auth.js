import urlJoin from "url-join";
import axios from "axios";
import { useStorage } from "vue3-storage";


const storage = useStorage();


const setToken = (accessToken, refreshToken) => {
    console.log("accessToken " + accessToken)
    console.log("refreshToken " + refreshToken)
    storage.setStorageSync('accessToken', accessToken);
    storage.setStorageSync('refreshToken', refreshToken);
}

const getToken = () => {
    return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    }
}

const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}
const verifyToken = async () => {
    const tokens = getToken();
    if (tokens.accessToken === null || tokens.refreshToken === null) {
        clearToken()
        return false
    }
    try {
        const verifyResponse = await axios.post(
            urlJoin(process.env.VITE_BACKEND_HOST, "/account/token/verify/"),
            {token: tokens.accessToken},
            {headers: {'Content-Type': 'application/json'}},
            {validateStatus: (status) => [401, 200].indexOf(status) !== -1}
        )
        if (verifyResponse.status === 200) {
            return true
        }
        const refreshResponse = await axios.post(
            urlJoin(process.env.VITE_BACKEND_HOST, "/account/token/refresh/"),
            {refresh: tokens.refreshToken},
            {headers: {'Content-Type': 'application/json'}},
            {validateStatus: (status) => [401, 200].indexOf(status) !== -1}
        )
        if (refreshResponse.status === 401) {
            clearToken();
            return false
        }
        setToken(refreshResponse.data.access, tokens.refreshToken)
        return true
    } catch (e) {
        clearToken();
        return false
    }
}

export {
    setToken,
    getToken,
    verifyToken
}
