<template>
    <div class="pay-page">
        <van-tabs v-model="activeName">
            <van-tab title="全部" name="a">
                <div class="order-box" v-for="item in allOrderList" :key="item.orderID">
                    <div class="goodsInfo">
                        <van-image width="60px" height="60px" :src="item.url" />
                        <div class="goods">
                            <span>{{ item.goodsName }}</span>
                            <span>￥{{ item.pirce }}</span>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <van-row v-if="item.payStatus != 0">
                            <van-col span="8">实付款：</van-col>
                            <van-col span="16">￥{{ completePirce(item.pirce, item.count) }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单编号：</van-col>
                            <van-col span="16">{{ item.orderID }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货人：</van-col>
                            <van-col span="16">{{ item.name }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货地址：</van-col>
                            <van-col span="16">{{ item.province }}/{{ item.city }}/{{ item.county }}&nbsp;&nbsp;{{ item.addressDetail }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单创建时间：</van-col>
                            <van-col span="16">{{ formatTime(item.date) }}</van-col>
                        </van-row>
                    </div>
                    <div class="btn">
                        <van-row type="flex" justify="end">
                            <van-button type="primary" size="mini" v-if="item.payStatus == 0" @click="clickPayBtn(item.orderID, item.pirce)">支付</van-button>
                            <van-button type="info" size="mini" v-if="item.payStatus == 1 && item.commentStatus == 0" @click="goToComment(item.goodsId, item.orderID)">评论</van-button>
                            <van-button type="warning" size="mini" @click="deleteOrder(item.orderID)">删除</van-button>
                        </van-row>
                    </div>
                </div>
            </van-tab>
            <van-tab title="已支付" name="b">
                <div class="order-box" v-for="item in payOrderList" :key="item.orderID">
                    <div class="goodsInfo">
                        <van-image width="60px" height="60px" :src="item.url" />
                        <div class="goods">
                            <span>{{ item.goodsName }}</span>
                            <span>￥{{ item.pirce }}</span>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <van-row v-if="item.payStatus != 0">
                            <van-col span="8">实付款：</van-col>
                            <van-col span="16">￥{{ completePirce(item.pirce, item.count) }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单编号：</van-col>
                            <van-col span="16">{{ item.orderID }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货人：</van-col>
                            <van-col span="16">{{ item.name }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货地址：</van-col>
                            <van-col span="16">{{ item.province }}/{{ item.city }}/{{ item.county }}&nbsp;&nbsp;{{ item.addressDetail }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单创建时间：</van-col>
                            <van-col span="16">{{ item.date }}</van-col>
                        </van-row>
                    </div>
                    <div class="btn">
                        <van-row type="flex" justify="end">
                            <van-button type="primary" size="mini" v-if="item.payStatus == 0" @click="clickPayBtn(item.orderID)">支付</van-button>
                            <van-button type="info" size="mini" v-if="item.payStatus == 1 && item.commentStatus == 0" @click="goToComment(item.goodsId, item.orderID)">评论</van-button>
                            <van-button type="warning" size="mini" @click="deleteOrder(item.orderID)">删除</van-button>
                        </van-row>
                    </div>
                </div></van-tab
            >
            <van-tab title="未支付" name="c">
                <div class="order-box" v-for="item in unPayOrderList" :key="item.orderID">
                    <div class="goodsInfo">
                        <van-image width="60px" height="60px" :src="item.url" />
                        <div class="goods">
                            <span>{{ item.goodsName }}</span>
                            <span>￥{{ item.pirce }}</span>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <van-row v-if="item.payStatus != 0">
                            <van-col span="8">实付款：</van-col>
                            <van-col span="16">￥{{ completePirce(item.pirce, item.count) }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单编号：</van-col>
                            <van-col span="16">{{ item.orderID }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货人：</van-col>
                            <van-col span="16">{{ item.name }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货地址：</van-col>
                            <van-col span="16">{{ item.province }}/{{ item.city }}/{{ item.county }}&nbsp;&nbsp;{{ item.addressDetail }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单创建时间：</van-col>
                            <van-col span="16">{{ item.date }}</van-col>
                        </van-row>
                    </div>
                    <div class="btn">
                        <van-row type="flex" justify="end">
                            <van-button type="primary" size="mini" v-if="item.payStatus == 0" @click="clickPayBtn(item.orderID, item.pirce)">支付</van-button>
                            <van-button type="info" size="mini" v-if="item.payStatus == 1 && item.commentStatus == 0" @click="goToComment(item.goodsId, item.orderID)">评论</van-button>
                            <van-button type="warning" size="mini" @click="deleteOrder(item.orderID)">删除</van-button>
                        </van-row>
                    </div>
                </div></van-tab
            >
            <van-tab title="已评价" name="d">
                <div class="order-box" v-for="item in commentOrderList" :key="item.orderID">
                    <div class="goodsInfo">
                        <van-image width="60px" height="60px" :src="item.url" />
                        <div class="goods">
                            <span>{{ item.goodsName }}</span>
                            <span>￥{{ item.pirce }}</span>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <van-row v-if="item.payStatus != 0">
                            <van-col span="8">实付款：</van-col>
                            <van-col span="16">￥{{ completePirce(item.pirce, item.count) }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单编号：</van-col>
                            <van-col span="16">{{ item.orderID }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货人：</van-col>
                            <van-col span="16">{{ item.name }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">收货地址：</van-col>
                            <van-col span="16">{{ item.province }}/{{ item.city }}/{{ item.county }}&nbsp;&nbsp;{{ item.addressDetail }}</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8">订单创建时间：</van-col>
                            <van-col span="16">{{ item.date }}</van-col>
                        </van-row>
                    </div>
                    <div class="btn">
                        <van-row type="flex" justify="end">
                            <van-button type="primary" size="mini" v-if="item.payStatus == 0" @click="clickPayBtn(item.orderID, item.pirce)">支付</van-button>
                            <van-button type="info" size="mini" v-if="item.payStatus == 1 && item.commentStatus == 0" @click="goToComment(item.goodsId, item.orderID)">评论</van-button>
                            <van-button type="warning" size="mini" @click="deleteOrder(item.orderID)">删除</van-button>
                        </van-row>
                    </div>
                </div></van-tab
            >
        </van-tabs>
        <van-dialog v-model="show" title="支付密码" :overlay="false" show-cancel-button @confirm="payOrder" :beforeClose="beforeClose">
            <!-- 密码输入框 -->
            <van-password-input :value="payValue" :focused="showKeyboard" @focus="showKeyboard = true" />
        </van-dialog>

        <!-- 数字键盘 -->
        <van-number-keyboard v-model="payValue" :show="showKeyboard" @blur="showKeyboard = false" />
    </div>
</template>
<script>
    import store from '@/store/store';
    import { dateFormat } from '@/utils/deepclone';
    import { changeOrderPayStatus, getOrderByUserId, deleteOrder, updateMoney } from '@/api/index';
    import { Toast, Notify, Dialog } from 'vant';
    export default {
        data() {
            return {
                title: '订单中心',
                activeName: 'a',
                userID: '',
                allOrderList: [],
                unPayOrderList: [],
                payOrderList: [],
                commentOrderList: [],
                payValue: '',
                showKeyboard: false,
                show: false,
                orderID: '',
                pirce: '',
            };
        },
        created() {
            let { userID } = store.state.userInfo;
            this.userID = userID;
            console.log(this.userID);
            this.getOrderByUserId();
        },
        methods: {
            formatTime(time) {
                return dateFormat(time);
            },
            goToComment(goodsId, orderID) {
                this.$router.push({
                    path: '/commentPage',
                    query: {
                        goodsId,
                        orderID,
                    },
                });
            },
            completePirce(price, count) {
                return (parseFloat(price) * parseFloat(count)).toFixed(2);
            },
            onClickLeft() {
                this.$router.go(-1);
                console.log(this.$route);
            },
            async getOrderByUserId() {
                let data = await getOrderByUserId({ userId: this.userID });
                if (data.status == 200) {
                    this.allOrderList = data.data.data.result ? data.data.data.result : [];
                    this.allOrderList.forEach((item) => {
                        if (item.payStatus == 0) {
                            this.unPayOrderList.push(item);
                        }
                        if (item.payStatus == 1) {
                            this.payOrderList.push(item);
                        }
                        if (item.commentStatus == 1) {
                            this.commentOrderList.push(item);
                        }
                    });
                }
            },
            async clickPayBtn(orderID, pirce) {
                this.show = true;
                this.orderID = orderID;
                this.pirce = pirce;
                console.log(this.pirce);
            },
            async payOrder() {
                let res = await updateMoney({ userID: this.userID, money: this.pirce, moneyPassword: this.payValue }).catch(() => {});
                if (res.data.data.status == false) {
                    Notify({ type: 'warning', message: res.data.data.message });
                    return false;
                }
                if (res.data.data.status == true) {
                    let data = await changeOrderPayStatus({ orderID: this.orderID }).catch(() => {});
                    if (data.status == 200) {
                        this.payValue = '';
                        this.show = false;
                        this.getOrderByUserId();
                    }
                }
            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    setTimeout(done, 1000);
                } else {
                    done();
                }
            },
            async deleteOrder(orderID) {
                Dialog.confirm({
                    title: '提示',
                    message: '确认要删除此订单？',
                })
                    .then(() => {
                        deleteOrder({ orderID })
                            .then((res) => {
                                if (res.status == 200) {
                                    Toast('删除成功');
                                    this.getOrderByUserId();
                                }
                            })
                            .catch(() => {});
                    })
                    .catch(() => {});
            },
        },
    };
</script>
<style lang="less" scoped>
.pay-page {
    width: 100vw;
    height: calc(100vh - 110px);
    overflow-y: auto;
    background-color: rgb(231, 239, 253);
    .order-box {
        width: 98vw;
        background-color: #fff;
        border-radius: 7px;
        margin: 0 auto;
        margin-bottom: 5px;
        .goodsInfo {
            height: 70px;
            width: 98vw;
            margin-top: 5px;
            .van-image {
                float: left;
                margin-left: 10px;
                margin-top: 5px;
            }
            .goods {
                height: 60px;
                width: 250px;
                float: right;
                font-size: 12px;
                color: rgb(51, 51, 51);
                span {
                    display: block;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
        .orderInfo {
            width: 90vw;
            font-size: 12px;
            margin: 0 auto;
            color: rgb(51, 51, 51);
            .van-col {
                line-height: 25px;
            }
        }
        .btn {
            height: 35px;
            width: 90vw;
            margin: 0 auto;
        }
    }
}
</style>