<!--
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-03 21:28:32
-->
<template>
    <div class="loyout">
        <div class="nav-bar">
            <van-nav-bar :border="false" :title="title" right-text="会员码" :left-arrow="false" @click-left="onClickLeft" @click-right="onClickRight"> </van-nav-bar>
            <div class="searchBox" v-if="isShow">
                <div class="search" @click="goToSearch"><van-icon name="search" /></div>
            </div>
        </div>
        <div class="view-content">
            <transition>
            <keep-alive>
                <router-view class="router"></router-view>
            </keep-alive>
            </transition>
        </div>
        <div class="tabbar">
            <van-tabbar v-model="activeRouter.active" active-color="#ee0a24" inactive-color="#000" @change="onChange">
                <van-tabbar-item icon="home-o">首页</van-tabbar-item>
                <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
                <van-tabbar-item icon="shopping-cart-o" :badge="count">购物车</van-tabbar-item>
                <van-tabbar-item icon="orders-o">订单</van-tabbar-item>
                <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store';
    import { mapMutations } from 'vuex';
    export default {
        name: 'AppLayout',
        watch: {
            // cart(newName) {
            //     newName.forEach((item) => {
            //         this.count = this.count + item.count;
            //     });
            // },
            cart: {
                handler(newName, oldVal) {
                    this.count = 0;
                    newName.forEach((item) => {
                        this.count = this.count + item.count;
                        if (this.count == 0) {
                            this.count = false;
                        }
                    });
                    console.log('new: %s, old: %s', newName, oldVal);
                },
                immediate: true,
                deep: true,
            },
            $route(form) {
                let name = form.path;
                console.log(name);
                this.isArrow = name == '/home' || name == '/find' || name == '/cart' || name == '/orderCenter' || name == '/classify' ? false : true;
                this.isShow = name == '/home' ? true : false;
            },
            activeRouter: {
                handler(newPath, oldPath) {
                    console.log('newpath:' + newPath, oldPath);
                    this.activeRouter.active = newPath.active;
                    this.readTitle(this.activeRouter.active);
                },
                immediate: true,
                deep: true,
            },
        },
        computed: {},
        data() {
            return {
                activeRouter: {
                    active: 0,
                    title: 'home',
                },
                titel: '首页',
                isArrow: true,
                isShow: true,
                count: false,
                cart: [],
                transitionName:''
            };
        },
        created() {
            this.count = store.getters.count;
            this.cart = store.state.cart;
            this.activeRouter = store.getters.activeRouter;

            this.isShow = this.activeRouter.active == 0 ? true : false;
            this.readTitle(this.activeRouter.active);
        },
        methods: {
            ...mapMutations(['SET_ACTIVE_ROUTER']),
            onClickLeft() {
                this.$router.go(-1);
                console.log(this.$route);
            },
            onClickRight() {},
            goToPage(paths, active) {
                if (this.$route.path == `/${paths}`) {
                    return false;
                }
                this.activeRouter = { title: paths, active };
                this.SET_ACTIVE_ROUTER({ title: paths, active });
                this.$router.replace({
                    path: `/${paths}`,
                });
            },
            goToSearch() {
                this.$router.push({
                    path: '/search',
                });
            },
            readTitle(active) {
                if (active == 0) {
                    this.title = '首页';
                }
                if (active == 1) {
                    this.title = '分类';
                }
                if (active == 2) {
                    this.title = '购物车';
                }
                if (active == 3) {
                    this.title = '订单中心';
                }
                if (active == 4) {
                    this.title = '我的';
                }
            },
            onChange(val) {
                switch (val) {
                    case 0:
                        this.goToPage('home', 0);
                        this.title = '首页';
                        break;
                    case 1:
                        this.goToPage('classify', 1);
                        this.title = '分类';
                        break;
                    case 2:
                        this.goToPage('cart', 2);
                        this.title = '购物车';
                        break;
                    case 3:
                        this.goToPage('orderCenter', 3);
                        this.title = '订单中心';
                        break;
                    case 4:
                        this.goToPage('find', 4);
                        this.title = '我的';
                        break;
                    default:
                }
            },
        },
    };
</script>

<style lang="less">
@import '../style/layout.less';
</style>
