<!--
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-05 13:22:59
-->
<template>
    <div class="goods-search">
        <div class="nav-bar">
            <van-nav-bar title="商品搜索" :left-arrow="true" @click-left="onClickLeft"> </van-nav-bar>
            <van-search placeholder="请输入搜索关键词" width="80vw" show-action v-model="goodsName">
                <template #action>
                    <van-button type="primary" size="small" @click="onSearch">搜索</van-button>
                </template>
            </van-search>
        </div>
        <div class="goods-box">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <div class="goodList">
                    <van-list v-model="loading" :finished="finished" offset="50" @load="onLoad(goodsName, page, size)">
                        <div class="goodBox" v-for="(item, index) in list" :key="item.goodsId" @click="goToDetail(item.goodsId)">
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
    </div>
</template>
<script>
    import { getGoodsListByGoodsName } from '@/api/index';
    export default {
        name: 'AppSearch',
        data() {
            return {
                isShow: true,
                goodsName: '',
                list: [],
                page: 1,
                size: 10,
                loading: false,
                finished: false,
                refreshing: false,
            };
        },
        mounted() {},
        created() {},
        methods: {
            onSearch(val) {
                this.page = 1;
                this.onLoad(this.goodsName, this.page, this.size);
            },
            onClickLeft() {
                this.$router.go(-1);
                console.log(this.$route);
            },
            async onLoad(goodsName, page, size) {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }
                let data = await getGoodsListByGoodsName({ goodsName, page, size }).catch(() => {});
                if (data.data.data.result.length > 0) {
                    this.page++;
                    this.list = [...this.list, ...data.data.data.result];
                    this.loading = false;
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
                this.onLoad(this.goodsName, this.page, this.size);
            },
        },
    };
</script>
<style lang="less" scoped>
.goods-search {
    width: 100vw;
    height: 100vh;
    background-color: rgb(231, 239, 253);
    .nav-bar {
        width: 100vw;
        height: 100px;
        .van-nav-bar {
            width: 100vw;
            height: 50px;
            background-color: rgb(113, 205, 248);
        }
        .van-search {
            margin: 0 auto;

            .van-button {
                margin-top: -5px;
            }
        }
    }
    .goods-box {
        width: 98vw;
        height: calc(100vh);
        background-color: #fff;
        margin: 0 auto;
        .goodList {
            width: 95vw;
            margin: 0 auto;
            justify-content: center;
            column-count: 2;
            column-gap: 1%;
            .goodBox {
                margin: 0 auto;
                break-inside: avoid;
                width: 45vw;
                margin-bottom: 10px;
                background-color: #fff;
                border-radius: 13px;
                overflow: hidden;
                .title {
                    margin: 0 0 0 5px;
                    vertical-align: top;
                    width: 95%;
                    word-break: break-all;
                    text-align: left;
                    font-size: 12px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
                .description {
                    margin: 5px 0 0 5px;
                    vertical-align: top;
                    width: 95%;
                    word-break: break-all;
                    text-align: left;
                    font-size: 12px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
                .pirce {
                    margin: 0 0 0 5px;
                    height: 40px;
                    line-height: 30px;
                    color: rgb(255, 43, 43);
                    span {
                        font-size: 18px;
                    }
                }
            }
        }
        .loading-box {
            width: 98vw;
            height: 30px;
            margin: 0 auto;
            margin-top: 20px;
            text-align: center;
            .loading {
                font-size: 14px;
            }
            .finished-text {
                font-size: 12px;
                color: rgb(63, 62, 62);
                line-height: 30px;
            }
        }
    }
}
</style>