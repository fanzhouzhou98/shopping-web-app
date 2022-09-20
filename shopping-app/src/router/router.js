/*
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-01 09:15:39
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/store";
const Layout = () => import("@/components/Layout")
const Home = () => import("@/views/home");
const Find = () => import("@/views/find");
const My = () => import("@/views/my");
const About = () => import("@/views/about");
const Login = () => import("@/page/login")
const Detail = () => import("@/views/detail")
const SearchPage = () => import("@/page/searchPage")
const GoodsManger = () => import("@/views/goodsManger")
const ShowComment = () => import("@/page/showComment")
const EditAddress = () => import("@/page/editAddress")
const OrderCenter = () => import("@/page/payPage")
const CommentPage = () => import("@/page/commentPage")
const Classify = ()=> import("@/views/classify")
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Layout,
        name: 'layout',
        redirect: '/home',
        children: [
            {
                path: "/home",
                component: Home,
                name: 'home',
                meta: {
                    keepAlive: true,
                    index:0 // 需要被缓存
                }

            },
            {
                path: "/cart",
                component: About,
                name: 'cart',
                meta:{index:2}
            },
            {
                path: "/find",
                component: Find,
                name: 'find',
                meta:{index:4}
            },
            {
                path: "/my",
                component: My,
                name: 'my'
            },
            {
                path: "/orderCenter",
                component: OrderCenter,
                name: 'orderCenter',
                meta:{index:3}
            },
            {
                path: "/classify",
                component: Classify,
                name: 'classify',
                meta:{index:1}
            },
        ]
    },
    {
        path: "/login",
        component: Login,
        name: 'login'
    },
    {
        path: "/search",
        component: SearchPage,
        name: 'search'
    },
    {
        path: "/goodsManger",
        component: GoodsManger,
        name: 'goodsManger'
    },
    {
        path: "/detail",
        component: Detail,
        name: 'detail'
    },
    {
        path: "/showComment",
        component: ShowComment,
        name: 'showComment'
    },
    {
        path: "/editAddress",
        component: EditAddress,
        name: 'editAddress'
    },
    {
        path: "/commentPage",
        component: CommentPage,
        name: 'commentPage'
    },
]

var router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    setTimeout(() => {
        if (store.getters.token) {//toekn存在
            if (to.path == '/login') {//token存在，并且是login页面
                next();
            } else {//token存在，不是login页面
                next();
            }
        } else {
            if (to.path == '/login') {//token不存在，并且是login页面
                next();
            } else {//token不存在，不是login页面
                next('/login');
            }
        }
    })

});
export default router;