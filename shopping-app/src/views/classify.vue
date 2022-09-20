<template>
    <div class="classify" style="height: 100vh">
        <van-tree-select height="100vh" :items="items" :main-active-index.sync="active" @click-nav="clickNav">
            <template #content>
                <div v-if="active === 0" v-for="item in goodsList">
                    <van-card :price="item.pirce" :desc="item.description" :title="item.goodsName" :thumb="item.url" @click="goToDetail(item.goodsId)"> </van-card>
                </div>
                <div v-if="active === 1" v-for="item in goodsList">
                    <van-card :price="item.pirce" :desc="item.description" :title="item.goodsName" :thumb="item.url" @click="goToDetail(item.goodsId)"> </van-card>
                </div>
                <div v-if="active === 2" v-for="item in goodsList">
                    <van-card :price="item.pirce" :desc="item.description" :title="item.goodsName" :thumb="item.url" @click="goToDetail(item.goodsId)"> </van-card>
                </div>
                <div v-if="active === 3" v-for="item in goodsList">
                    <van-card :price="item.pirce" :desc="item.description" :title="item.goodsName" :thumb="item.url" @click="goToDetail(item.goodsId)"> </van-card>
                </div>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
    import { getClassifyGoods } from '@/api/index';
    export default {
        data() {
            return {
                active: 0,
                items: [{ text: '热销' }, { text: '华为' }, { text: 'vivo' }, { text: '苹果' }, { text: '小米' }],
                goodsList: [],
            };
        },
        created() {
            this.getGoodsClassify(this.active);
        },
        methods: {
            clickNav(val) {
                console.log(this.active);
                this.getGoodsClassify(this.active);
                //          switch(this.active)
                // {
                //     case 0:
                //         this.getGoodsClassify('1')
                //         break;
                //     case 1:
                //         this.getGoodsClassify('2')
                //         break;
                //     case 2:
                //         this.getGoodsClassify('3')
                //         break;
                //     case 3:
                //          this.getGoodsClassify('4')
                //         break;
                //     default:
                //          this.getGoodsClassify('0')
                // }
            },
            async getGoodsClassify(goodsClassify) {
                let data = await getClassifyGoods({ goodsClassify }).catch(() => {});
                console.log(data);
                if (data.status == 200) {
                    console.log(222);
                    this.goodsList = data.data.data.result ? data.data.data.result : [];
                    console.log(this.goodsList);
                }
            },
            goToDetail(goodsId) {
                this.$router.push({
                    path: '/detail',
                    query: {
                        goodsId,
                    },
                });
            },
        },
    };
</script>

<style>
</style>