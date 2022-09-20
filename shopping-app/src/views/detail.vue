<!--
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-04 20:09:48
-->
<template>
    <div class="detail">
        <div class="nav-bar">
            <van-nav-bar title="商品详情" right-text="" :left-arrow="isArrow" @click-left="onClickLeft"> </van-nav-bar>
        </div>
        <div class="zw"></div>
        <div class="swiper">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in images" :key="index">
                    <img v-lazy="item.url" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="goodsInfo">
            <van-row>
                <van-col span="24"
                    ><div class="pirce">
                        ￥<span>{{ goodsInfo.pirce }}</span>
                    </div></van-col
                >
                <van-col span="24"
                    ><div class="goods-name">
                        <span>{{ goodsInfo.goodsName }}</span>
                    </div></van-col
                >
                <van-col span="24"
                    ><div class="description">
                        <span>{{ goodsInfo.description }}</span>
                    </div></van-col
                >
                <van-col span="24"
                    ><div class="stock">
                        库存：<span>{{ goodsInfo.stock }}</span>
                    </div></van-col
                >
            </van-row>
            <van-row>
                <van-col span="16"
                    ><div class="count"><span>购买数量:</span></div></van-col
                >
                <van-col span="8"><van-stepper v-model="count" :disabled="count >= goodsInfo.stock" /></van-col>
            </van-row>
            <van-row>
                <van-col span="24"
                    ><div class="star">
                        <span><van-icon name="like-o" />收藏</span>
                    </div></van-col
                >
            </van-row>
        </div>
        <div class="goodsCommentShow">
            <van-row>
                <van-col span="16"><span class="pj">宝贝评价</span></van-col>
                <van-col span="8"><span class="ck" @click="goToShowComment(goodsId)">查看全部 ></span></van-col>
            </van-row>
            <div class="no-comment" v-if="commentList.length == 0">
                <h3>暂无评价~~</h3>
            </div>
            <div class="comment-box" v-else v-for="item in commentList">
                <div class="user">
                    <van-image round width="40px" height="40px" :src="item.avator" />
                    <span class="user-name">{{ item.nickName }}</span>
                </div>
                <div class="comment">{{ item.contentText }}</div>
                <div class="rate">
                    <span>评分：</span>
                    <van-rate v-model="item.rate" />
                </div>
                <div class="time">{{ formatTime(item.date) }}</div>
            </div>
        </div>
        <div class="goodsImg">
            <van-divider>商品详情</van-divider>
            <van-image v-for="item in images" :key="item.id" width="100vw" :src="item.url" />
        </div>
        <van-goods-action>
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="addShopingCart(goodsId)" />
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="goShoping(goodsId)" />
        </van-goods-action>
    </div>
</template>
<script>
    import { getGoodsDetailImgById, getGoodsById, getCommentPage } from '@/api/index';
    import { formatTime } from '@/utils/deepclone';
    import { Toast } from 'vant';
    import { mapMutations } from 'vuex';
    import store from '@/store/store';
    export default {
        name: 'AppDetail',
        data() {
            return {
                value: 1,
                isArrow: true,
                goodsInfo: {
                    goodsName: '',
                    pirce: '',
                },
                count: 0,
                images: [],
                commentList: [],
                goodsId: '',
            };
        },
        created() {
            let { goodsId } = this.$route.query;
            this.goodsId = goodsId;
            this.getGoodsById(goodsId);
            this.getCommentPage(1, goodsId, 1);
            this.getGoodsDetailImgById(goodsId);
        },
        methods: {
            ...mapMutations(['SET_CART', 'SET_ACTIVE_ROUTER']),
            getGoodsById(goodsId) {
                getGoodsById({ goodsId })
                    .then((res) => {
                        console.log(res);
                        if (res.data.data.status) {
                            this.goodsInfo = res.data.data.result[0] ? res.data.data.result[0] : {};
                        }
                    })
                    .catch();
            },
            formatTime(time) {
                return formatTime(time);
            },
            onClickLeft() {
                this.$router.go(-1);
                console.log(this.$route);
            },
            goToShowComment(goodsId) {
                this.$router.push({
                    path: '/showComment',
                    query: {
                        goodsId,
                    },
                });
            },
            addShopingCart(goodsId) {
                console.log(store.state.cart);
                let cart = store.state.cart;
                console.log(cart);
                if (cart.length == 0) {
                    let params = {
                        ...this.goodsInfo,
                        count: this.count,
                        cartId: new Date().getTime(),
                        checked: false,
                    };
                    cart.push({ ...params });
                    this.SET_CART(cart);
                    Toast({
                        message: '添加成功！商品在购物车等待亲😊',
                        duration: 1000,
                        forbidClick: true,
                    });
                    return false;
                } else {
                    let falg = 0;
                    cart.forEach((element) => {
                        if (element.goodsId == goodsId) {
                            console.log(element.count);
                            falg++;
                            element.count = element.count + this.count;
                            this.SET_CART(cart);
                            return false;
                        }
                    });
                    if (falg == 0) {
                        let params = {
                            ...this.goodsInfo,
                            count: this.count,
                            cartId: new Date().getTime(),
                            checked: false,
                        };
                        cart.push({ ...params });
                        this.SET_CART(cart);
                    }
                    Toast({
                        message: '添加成功！商品在购物车等待亲😊',
                        duration: 1000,
                        forbidClick: true,
                    });
                }
            },
            goShoping(goodsId) {
                console.log(store.state.cart);
                let cart = store.state.cart;
                console.log(cart);
                if (cart.length == 0) {
                    let params = {
                        ...this.goodsInfo,
                        count: this.count,
                        cartId: new Date().getTime(),
                        checked: false,
                    };
                    cart.push({ ...params });
                    this.SET_CART(cart);
                    this.SET_ACTIVE_ROUTER({ title: '/about', active: 2 });
                    this.$router.replace({
                        path: '/cart',
                    });
                    return false;
                } else {
                    let falg = 0;
                    cart.forEach((element) => {
                        if (element.goodsId == goodsId) {
                            console.log(element.count);
                            falg++;
                            element.count = element.count + this.count;
                            this.SET_CART(cart);
                            return false;
                        }
                    });
                    if (falg == 0) {
                        let params = {
                            ...this.goodsInfo,
                            count: this.count,
                            cartId: new Date().getTime(),
                            checked: false,
                        };
                        cart.push({ ...params });
                        this.SET_CART(cart);
                    }
                    this.SET_ACTIVE_ROUTER({ title: '/about', active: 2 });
                    this.$router.replace({
                        path: '/cart',
                    });
                }
            },
            async getGoodsDetailImgById(goodsId) {
                let data = await getGoodsDetailImgById({ goodsId }).catch(() => {});
                if (data.status == 200) {
                    this.images = data.data.data.result;
                }
            },
            async getCommentPage(page, goodsID, size) {
                let data = await getCommentPage({ page, goodsID, size }).catch(() => {});
                if (data.status == 200) {
                    this.commentList = data.data.data.result ? data.data.data.result : [];
                }
            },
        },
    };
</script>
<style lang="less" scoped>
@import '../style/goodsDetail.less';
</style>