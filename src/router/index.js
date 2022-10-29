import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "CompanyHome",
        component: () => import("../components/Home.vue"),
    },
    {
        path: "/policy/privacy",
        name: "PolicyPrivacy",
        component: () => import("../components/policy/Privacy.vue"),
    },
    {
        path: "/policy/service",
        name: "PolicyService",
        component: () => import("../components/policy/Service.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../components/auth/Login.vue"),
    },
    {
        path: "/auth/kakao",
        name: "KakaoCallback",
        component: () => import("../components/auth/KakaoCallback.vue"),
    },
    {
        path: "/company/receipt",
        name: "CompanyReceipt",
        component: () => import("../components/receipt/Receipt.vue"),
    },
    {
        path: "/company/receipt/personal",
        name: "CompanyReceiptPersonal",
        component: () => import("../components/receipt/Personal.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
