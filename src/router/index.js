import { createWebHistory, createRouter } from "vue-router";
import {verifyToken} from "../services/auth.js";
import store from "../store/index.js";

const routes = [
    {
        path: "/",
        name: "CompanyHome",
        component: () => import("../components/Home.vue"),
        meta: {requireAuth: null}
    },
    {
        path: "/policy/privacy",
        name: "PolicyPrivacy",
        component: () => import("../components/policy/Privacy.vue"),
        meta: {requireAuth: null}
    },
    {
        path: "/policy/service",
        name: "PolicyService",
        component: () => import("../components/policy/Service.vue"),
        meta: {requireAuth: null}
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../components/auth/Login.vue"),
        meta: {requireAuth: false}
    },
    {
        path: "/auth/kakao",
        name: "KakaoCallback",
        component: () => import("../components/auth/KakaoCallback.vue"),
        meta: {requireAuth: false}
    },
    {
        path: "/company/receipt",
        name: "CompanyReceipt",
        component: () => import("../components/receipt/Receipt.vue"),
        meta: {requireAuth: true}
    },
    {
        path: "/company/receipt/personal",
        name: "CompanyReceiptPersonal",
        component: () => import("../components/receipt/Personal.vue"),
        meta: {requireAuth: true}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requireAuth = to.meta.requireAuth
    if (requireAuth === null) {
        next();
    } else {
        console.log(store)
        store.commit('loader/setIsLoading', true);
        const authStatus = await verifyToken()
        if (requireAuth === true) {
            // 로그인이 필요한 페이지
            if (authStatus) {
                next();
            } else {
                next({name: "Login"});
            }
        } else {
            if (authStatus) {
                // 로그인이 되어 있는 경우 접수 화면으로 이동
                next({name: "CompanyReceipt"});
            } else {
                // 로그인이 안되어 있다면 페이지를 정상적으로 표시
                next();
            }
        }
        store.commit('loader/setIsLoading', false);
    }
})

export default router;
