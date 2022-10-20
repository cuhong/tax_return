import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/company",
        name: "CompanyHome",
        component: () => import("../components/Home.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../components/auth/Login.vue"),
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
