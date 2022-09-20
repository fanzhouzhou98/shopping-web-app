<template>
    <div class="cart">
        <div class="address">
            <div class="addrInfo">
                <div class="name" v-if="addressInfo.name != null">{{ addressInfo.name }}&nbsp;&nbsp;{{ addressInfo.tel }}</div>
                <div class="addr" v-if="addressInfo.name != null">{{ addressInfo.province }}/{{ addressInfo.city }}/{{ addressInfo.county }}&nbsp;&nbsp;{{ addressInfo.addressDetail }}</div>
                <div class="no-addrInfo" v-else>请添加收货地址~~</div>
            </div>
            <div class="edit"><van-icon name="arrow" @click="goToEditAddress" /></div>
        </div>
        <div class="ungoods-list" v-if="cartList.length == 0">
            <span>购物车内没有商品，快快去添加吧~</span>
        </div>
        <div class="goods-list" v-else>
            <!-- <van-swipe-cell> -->
            <div class="goods-box" v-for="item in cartList" :key="item.cartId">
                <van-card :num="item.count" :price="item.pirce" :desc="item.description" :title="item.goodsName" :thumb="item.url">
                    <template #footer>
                        <van-button size="mini" type="warning" @click="delCart(item.cartId)">删除</van-button>
                        <!-- <van-button size="mini" type="primary">去支付</van-button> -->
                        <van-checkbox v-model="item.checked" checked-color="#ee0a24" @change="signSelect(item.goodsId)"></van-checkbox>
                    </template>
                </van-card>
            </div>
            <!-- <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell> -->
        </div>
        <div class="pay">
            <van-row van-row type="flex" justify="space-between">
                <van-col span="10">
                    <span class="check">
                        <van-checkbox v-model="checked" checked-color="#ee0a24" @change="allSelect">全选</van-checkbox>
                    </span>
                </van-col>
                <van-col span="8">
                    <span class="tb">￥</span>
                    <span class="pirce">
                        {{ totalPirce }}
                    </span>
                </van-col>
                <van-col span="6">
                    <van-button round type="info" @click="submitOrder">去结算</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import store from '@/store/store';
    import { deepClone } from '@/utils/deepclone';
    import { queryAddressByUserId, createOrder, getOrderByUserId } from '@/api/index';
    import { Toast ,Notify} from 'vant';
    export default {
        name: 'AppAbout',
        data() {
            return {
                msg: '我是about 组件',
                cartList: [],
                checked: false,
                totalPirce: 0,
                addressInfo: {},
                falg: true,
                userID: '',
                payList: [],
                count: null,
            };
        },
        watch: {
            $route(from) {
                if (from.path == '/about') {
                    this.queryAddressByUserId(this.userID);
                }
            },
        },
        created() {
            this.count = store.getters.count;
            this.getCart();
            let { userID } = store.state.userInfo;
            this.userID = userID;
            this.queryAddressByUserId(userID);
            this.getOrderByUserId();
        },
        methods: {
            ...mapMutations(['SET_CART', 'SET_ACTIVE_ROUTER']),
            getCart() {
                let cart = store.state.cart;
                this.cartList = cart;
                console.log(this.cartList);
            },
            delCart(cartId) {
                this.cartList.forEach((item, index) => {
                    if (item.cartId == cartId) {
                        this.cartList.splice(this.cartList[index], 1);
                        this.SET_CART(this.cartList);
                    }
                });
            },
            goToEditAddress() {
                if (this.falg == false) {
                    this.$router.push({
                        path: '/editAddress',
                        query: { type: 0 },
                    });
                } else {
                    this.$router.push({
                        path: '/editAddress',
                        query: { type: 1 },
                    });
                }
            },
            allSelect() {
                let list = deepClone(this.cartList);
                this.payList = [];
                if (this.checked == true) {
                    for (let i = 0; i < list.length; i++) {
                        list[i].checked = true;
                    }
                    this.cartList = list;
                    this.totalPirce = 0;
                    this.cartList.forEach((item) => {
                        if (item.checked == true) {
                            this.totalPirce = parseFloat(this.totalPirce) + parseFloat(item.pirce) * parseFloat(item.count);
                        }
                    });
                } else if (this.checked == false) {
                    for (let i = 0; i < list.length; i++) {
                        list[i].checked = false;
                    }
                    this.cartList = list;
                    this.totalPirce = 0;
                    //    this.payList = []
                }
                console.log(this.payList);
            },
            signSelect(goodsID) {
                this.totalPirce = 0;
                this.cartList.forEach((item, index) => {
                    if (item.checked == true) {
                        this.totalPirce = (parseFloat(this.totalPirce) + parseFloat(item.pirce) * parseFloat(item.count)).toFixed(2);
                        if (item.goodsId == goodsID) {
                            this.payList.push({
                                userID: this.userID,
                                goodsID,
                                count: item.count,
                                addressID: this.addressInfo.addressID,
                            });
                        }
                    } else if (item.checked == false) {
                        this.payList.forEach((element, index) => {
                            if (item.goodsId == element.goodsID) {
                                this.payList.splice(index, 1);
                            }
                        });
                    }
                });
                console.log(this.payList);
            },
            async queryAddressByUserId(userID) {
                let data = await queryAddressByUserId({ userID }).catch(() => {});
                if (data.status == 200) {
                    console.log(data);
                    if (data.data.data.result.length == 0) {
                        this.falg = false;
                    }
                    this.addressInfo = data.data.data.result[0] ? data.data.data.result[0] : {};
                }
            },
            async submitOrder() {
                if (this.addressInfo.addressID == null) {
                    Notify({ type: 'warning', message: '请选填写收货信息！' });
                    return false;
                }
                this.payList.forEach((item) => {
                    item.addressID = this.addressInfo.addressID;
                });
                let data = await createOrder({ orderList: [...this.payList] });
                if (data.status == 200) {
                    // let list = deepClone (this.cartList)
                    this.totalPirce = 0;
                    this.payList.forEach((item, index) => {
                        this.cartList.forEach((element, j) => {
                            if (item.goodsID == element.goodsId) {
                                this.cartList.splice(j, 1);
                            }
                            this.totalPirce = (parseFloat(this.totalPirce) + parseFloat(item.pirce) * parseFloat(item.count)).toFixed(2);
                        });
                    });
                    Toast.loading({
                        message: '提交订单中...',
                        forbidClick: true,
                        onClose: this.tip,
                    });
                    this.SET_CART(this.cartList);
                    this.payList = [];
                    this.SET_ACTIVE_ROUTER({ title: '/orderCenter', active: 3 });
                    this.$router.replace({
                        path: '/orderCenter',
                    });
                }
            },
            tip() {
                Toast({
                    message: '订单提交成功',
                    forbidClick: true,
                });
            },
            async getOrderByUserId() {
                let data = await getOrderByUserId({ userId: this.userID });
            },
        },
    };
</script>
<style lang="less">
.cart {
    width: 100vw;
    height: calc(100vh - 159px);
    overflow-y: auto;
    background-color: rgb(231, 239, 253);
    .address {
        width: 98vw;
        height: 80px;
        border-radius: 7px;
        background-color: #fff;
        margin: 0 auto;
        margin-top: 5px;
        .addrInfo {
            width: 80%;
            float: left;
            .name {
                height: 30px;
                margin-left: 5px;
                line-height: 20px;
                font-size: 12px;
                color: rgb(65, 61, 61);
            }
            .addr {
                margin-left: 5px;
                line-height: 20px;
                font-size: 12px;
                color: rgb(65, 61, 61);
                vertical-align: top;
                word-break: break-all;
                text-align: left;
            }
            .no-addrInfo {
                width: 98vw;
                height: 80px;
                line-height: 80px;
                text-align: center;
                font-size: 14px;
                color: rgb(100, 98, 98);
            }
        }

        .edit {
            width: 15%;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
            float: right;
        }
    }
    .ungoods-list {
        width: 98vw;
        height: 200px;
        margin: 0 auto;
        font-size: 16px;
        height: 100px;
        text-align: center;
        span {
            font-size: 14px;
            height: 100%;
            line-height: 100px;
            color: rgb(61, 60, 60);
            text-align: center;
        }
    }
    .goods-list {
        width: 98vw;
        margin: 0 auto;
        .goods-box {
            width: 98vw;
            height: 150px;
            margin: 5px 0 5px 0;
            .van-card {
                border-radius: 13px;
            }
        }
        .delete-button {
            height: 100%;
        }
    }
    .pay {
       position: fixed;
        bottom: 53px;
        width: 98vw;
        height: 50px;
        left: 50%;
        margin-left: -49vw;
        background-color: #fff;
        border-radius: 7px;
        .van-col {
            margin: 3px 0 0 0;
        }
        .van-checkbox {
            width: 80px;
            height: 40px;
            font-size: 18px;
            line-height: 40px;
            margin-left: 5px;
        }
        .pirce {
            height: 40px;
            width: 60px;
            color: rgb(236, 27, 27);
            line-height: 40px;
            font-size: 20px;
        }
        .tb {
            color: rgb(236, 27, 27);
        }
    }
}
</style>