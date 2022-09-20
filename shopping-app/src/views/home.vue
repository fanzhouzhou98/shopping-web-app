<!--
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-01 09:23:39
-->
<template>
    <div class="home">
        <div class="swiper">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in swiperList" :key="index">
                    <img v-lazy="item.swiper" @click.stop="goToDetail(item.goodsId)" />
                </van-swipe-item>
            </van-swipe>
        </div>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="goodList">
                <van-list v-model="loading" :finished="finished" offset="50" @load="getGoodsListPage(page, size)">
                    <div class="goodBox" v-for="(item, index) in list" :key="index" @click="goToDetail(item.goodsId)">
                        <van-image :src="item.url" />
                        <div class="title">{{ item.goodsName }}</div>
                        <div class="description">{{ item.description }}</div>
                        <div class="pirce">
                            ￥<span>{{ item.pirce }}</span>
                        </div>
                    </div>
                </van-list>
            </div>
            <div class="loading-box">
                <span class="loading" v-if="loading"><van-loading type="spinner" color="#1989fa" /></span>
                <span class="finished-text" v-if="finished">没有更多了~</span>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script>
    import { getGoodsListPage, getGoodsSwipers } from '@/api/index';
    // import secret from '../utils/secret';
    export default {
        name: 'AppHome',
        data() {
            return {
                pawMsg: '',
                ansMsg: '',
                swiperList: [],
                page: 1,
                size: 6,
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                swiperSize: 4,
            };
        },
        created() {
            this.getSwiper(this.swiperSize);
        },
        methods: {
            goToDetail(goodsId) {
                this.$router.push({
                    path: '/detail',
                    query: {
                        goodsId,
                    },
                });
            },
            async getGoodsListPage(page, size) {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }
                let data = await getGoodsListPage({ page, size }).catch(() => {});
                if (data.data.data.result.length > 0) {
                    this.page++;
                    this.list = [...this.list, ...data.data.data.result];
                    this.loading = false;
                    console.log(this.list);
                }
                if (data.data.data.result.length == 0) {
                    this.loading = false;
                    this.finished = true;
                }
            },
            onRefresh() {
                // 清空列表数据
                this.page = 1;
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.getGoodsListPage(this.page, this.size);
            },
            async getSwiper() {
                let data = await getGoodsSwipers({ swiperSize: this.swiperSize }).catch(() => {});
                if (data.status == 200) {
                    this.swiperList = data.data.data.result ? data.data.data.result : [];
                }
            },
        },
    };
</script>
<style lang="less" scoped>
@import '../style/home.less';
</style>