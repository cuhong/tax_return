import urlJoin from "url-join";

const {VITE_HOST, VITE_BACKEND_HOST} = import.meta.env;
import router from "../router";
// import {setToken} from "../services/auth.js";
import { useKakao } from 'vue3-kakao-sdk'
import axios from "axios";
const { kakao } = useKakao()

const getKakaoRedirectUrl = () => {
    const redirectUri = router.resolve({name: "KakaoCallback"}).href
    return urlJoin(VITE_HOST, redirectUri)
}

const requestKakaoAuthCode = () => {
    const redirectUrl = getKakaoRedirectUrl();
    kakao.value.Auth.authorize({
        redirectUri: redirectUrl,
        scope: 'openid'
    })
}

const requestKakaoLogin = async (kakaoAuthCode) => {
    try {
        const redirectUrl = getKakaoRedirectUrl();
        const requestUrl = urlJoin(VITE_BACKEND_HOST, "/account/kakao/auth/");
        const response = await axios.post(requestUrl, {
            "redirect_url": redirectUrl,
            "kakao_auth_code": kakaoAuthCode,
            "campaign_code": "2022youtubereturn"
        })
        return {result: true, data: response.data}
    } catch (e) {
        console.log(e)
        const responseData = e.response.data
        return {result: false, message: responseData.message, error: responseData.error}
    }

}

export {
    getKakaoRedirectUrl,
    requestKakaoAuthCode,
    requestKakaoLogin
}
