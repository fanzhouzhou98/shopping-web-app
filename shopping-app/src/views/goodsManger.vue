<template>
    <div class="goods-manager">
        <div class="nav-bar">
            <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
        </div>
        <div class="goods-add">
            <van-row>
                <!-- 输入任意文本 -->
                <van-field v-model="goodsName" label="商品名称:" />
                <!-- 输入任意文本 -->
                <van-field v-model="description" label="描述信息:" />
                <!-- 输入任意文本 -->
                <van-field v-model="pirce" label="价格:" />
                <!--  -->
                <van-field v-model="stock" label="数量:" />
            </van-row>
            <van-row style="margin-top: 20px; font-size: 14px">
                <van-col span="23" offset="1"> <span style="height: 30px; line-height: 30px">商品缩略图:</span></van-col>
                <van-col span="22" offset="2">
                    <van-uploader v-model="imgFileList" :max-count="1" :after-read="afterRead" />
                </van-col>
            </van-row>
            <van-row style="margin-top: 20px; font-size: 14px">
                <van-col span="23" offset="1"> <span style="height: 30px; line-height: 30px">商品详情图:</span></van-col>
                <van-col span="22" offset="2">
                    <van-uploader v-model="detailsFileList" multiple :max-count="6" :after-read="detailAfterRead" />
                </van-col>
            </van-row>
            <van-row style="margin-top: 20px; font-size: 14px">
                <van-col span="23" offset="1"> <span style="height: 30px; line-height: 30px">商品分类:</span></van-col>
                <van-col span="22" offset="2">
                    <van-radio-group v-model="goodsClassify" direction="horizontal">
                        <van-radio name="0">热销</van-radio>
                        <van-radio name="1">华为</van-radio>
                        <van-radio name="2">vivo</van-radio>
                        <van-radio name="3">苹果</van-radio>
                        <van-radio name="4">小米</van-radio>
                    </van-radio-group>
                </van-col>
            </van-row>
            <van-row style="margin-top: 20px; font-size: 14px">
                <van-col span="23" offset="1"> <span style="height: 30px; line-height: 30px; font-size: 14px; margin-top: 20px">设置推荐:</span></van-col>
                <van-col span="22" offset="2">
                    <van-radio-group v-model="isRecommend" direction="horizontal">
                        <van-radio name="0">否</van-radio>
                        <van-radio name="1">是</van-radio>
                    </van-radio-group>
                </van-col>
            </van-row>
            <van-row style="margin-top: 20px; font-size: 14px" v-if="isRecommend == 1">
                <van-col span="23" offset="1"> <span style="height: 30px; line-height: 30px">首页swiper:</span></van-col>
                <van-col span="22" offset="2">
                    <van-uploader v-model="swiperFileList" :max-count="1" :after-read="swiperAfterRead" />
                </van-col>
            </van-row>
            <van-row type="flex" justify="center" style="margin-top: 40px">
                <van-button type="primary" @click="submit">确认</van-button>
            </van-row>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    // import { mapMutations } from 'vuex';
    import { addGoods, generateGoodsNo, addGoodsDetailImg, getGoodsById, getGoodsDetailImgById } from '@/api/index';
    import { Notify } from 'vant';
    import store from '@/store/store';
    export default {
        name: 'AppAbout',
        data() {
            return {
                goodsId: '',
                goodsName: '',
                description: '',
                pirce: '',
                stock: '',
                url: '',
                swiper: '',
                goodsClassify: '0',
                isRecommend: '0',
                imgFileList: [],
                detailsFileList: [],
                swiperFileList: [],
                list: [],
            };
        },
        created() {
            let { type, goodsId } = this.$route.query;
            console.log(type, goodsId);
            if (type == 0) {
                this.title = '添加商品';
                this.createGoodsId();
            } else if (type == 1) {
                this.title = '修改商品';
                this.getGoodsById(goodsId);
                this.getGoodsDetailImgById(goodsId);
            }
        },
        methods: {
            async createGoodsId() {
                let data = await generateGoodsNo().catch(() => {});
                if (data.data.data.status) {
                    this.goodsId = data.data.data.goodsId;
                }
            },
            async addGoodsDetailImg() {
                let params = {
                    imgs: this.detailsFileList,
                    goodsId: this.goodsId,
                };
                await addGoodsDetailImg(params).catch(() => {});
                // if (data.data.data.status) {

                // }
            },
            onClickLeft() {
                this.$router.go(-1);
            },
            async submit() {
                this.createGoodsId();
                let goodsInfo = {
                    goodsId: this.goodsId,
                    goodsName: this.goodsName,
                    description: this.description,
                    pirce: this.pirce,
                    stock: this.stock,
                    url: this.url,
                    imgs: this.detailsFileList,
                    goodsClassify: this.goodsClassify,
                    isRecommend: this.isRecommend,
                    swiper: this.swiper,
                };
                let data = await addGoods(goodsInfo).catch(() => {});
                if (data.status == 200) {
                    if (data.data.data.status == true) {
                        this.addGoodsDetailImg();
                        Notify({ type: 'success', message: '添加成功！' });
                        this.goodsName = '';
                        this.description = '';
                        this.pirce = '';
                        this.stock = '';
                        this.url = '';
                        this.goodsClassify = '0';
                        this.isRecommend = '0';
                        this.imgFileList = [];
                        this.detailsFileList = [];
                        this.list = [];
                        this.swiper = '';
                    }
                }
            },
            async afterRead(file) {
                //   此时可以自行将文件上传至服务器
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                axios
                    .post('http://127.0.0.1:7001/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: store.state.token,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        this.url = `http://127.0.0.1:7001/public/uploads/${res.data.data}`;
                        // this.imgFileList = this.detailsFileList;
                    });
            },
            async swiperAfterRead(file) {
                //   此时可以自行将文件上传至服务器
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                axios
                    .post('http://127.0.0.1:7001/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: store.state.token,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        this.swiper = `http://127.0.0.1:7001/public/uploads/${res.data.data}`;
                        // this.imgFileList = this.detailsFileList;
                    });
            },
            async detailAfterRead(file) {
                //   此时可以自行将文件上传至服务器
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                axios
                    .post('http://127.0.0.1:7001/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: store.state.token,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        this.list.push({ url: `http://127.0.0.1:7001/public/uploads/${res.data.data}` });
                        this.detailsFileList = this.list;
                    });
            },
            async getGoodsById(goodsId) {
                let data = await getGoodsById({ goodsId }).catch(() => {});
                console.log(data);
                let goodsInfo = data.data.data.result[0];
                this.goodsName = goodsInfo.goodsName;
                this.description = goodsInfo.description;
                this.stock = goodsInfo.stock;
                this.pirce = goodsInfo.pirce;
                this.url = goodsInfo.url;
                this.goodsClassify = goodsInfo.goodsClassify;
                this.isRecommend = goodsInfo.isRecommend;
                this.imgFileList = [{ url: goodsInfo.url }];
                this.swiperFileList = [{ url: goodsInfo.swiper }];
            },
            async getGoodsDetailImgById(goodsId) {
                let data = await getGoodsDetailImgById({ goodsId }).catch(() => {});
                if (data.status == 200) {
                    console.log(data);
                    this.detailsFileList = data.data.data.result;
                }
            },
        },
    };
</script>
<style lang="less" scoped>
.goods-manager {
    width: 100vw;
    height: 100vw;
    background-color: rgb(231, 239, 253);
    .nav-bar {
        height: 50px;
        width: 100vw;
        .van-nav-bar {
            height: 50px;
            width: 100vw;
            background-color: rgb(113, 205, 248);
        }
    }
    .goods-add {
        width: 98vw;
        background-color: #fff;
        margin: 0 auto;
    }
}
</style>