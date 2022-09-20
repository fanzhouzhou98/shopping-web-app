<template>
    <div class="find">
        <div class="my">
            <div class="avtor" style="width: 60px; heigth: 60px; margin: 0 auto; margin-top: 10px">
                <van-uploader :after-read="afterRead" :disabled="isDisabled">
                    <van-image round width="60px" height="60px" :src="userInfoDetail.avator" />
                </van-uploader>
            </div>
            <div class="update-user-Info">
                <van-field v-model="userInfoDetail.nickName" label="昵称" :disabled="isDisabled" />
                <!-- 输入任意文本 -->
                <van-field name="gender" label="性别" :disabled="isDisabled">
                    <template #input>
                        <van-radio-group v-model="userInfoDetail.gender" direction="horizontal" :disabled="isDisabled">
                            <van-radio :name="'1'">男</van-radio>
                            <van-radio :name="'2'">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field readonly clickable name="birthday" :value="formatDate(userInfoDetail.birthday)" label="生日" placeholder="点击选择时间" @click="showPicker = true" :disabled="isDisabled" />
                <van-popup v-model="showPicker" position="bottom">
                    <van-datetime-picker v-model="userInfoDetail.birthday" type="date" title="选择年月日" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>
                <van-field v-model="userInfoDetail.signature" label="个性签名" :disabled="isDisabled" />
                <div class="money-box">
                    <div class="money">账户金额：{{ moneyFound }}&nbsp;&nbsp;元</div>
                    <div class="charge" @click="clickCharge">充值</div>
                </div>
                <div class="btn-box" style="width: 90vw; height: 40px; text-align: center; margin-top: 20px">
                    <van-button v-if="isDisabled" type="primary" size="small" @click="editUserInfo">修改</van-button>
                    <van-button v-if="!isDisabled" type="info" size="small" @click="updateUserDetailByUserId">确定</van-button>
                </div>
            </div>
            <div class="goods-manger" v-if="userType == 1">
                <van-divider />
                <p>商品管理</p>
                <div class="goods-add">
                    <span class="title">添加商品</span>
                    <span class="btn"><van-icon name="arrow" @click="goToGoodsManger(0)" /></span>
                    <!-- <van-button type="primary">添加商品</van-button> -->
                </div>
                <div class="goods-update">
                    <van-search v-model="goodsName" placeholder="搜索要管理的商品名称" width="80vw" show-action @search="onSearch" @cancel="onCancel"
                        ><template #action>
                            <van-button type="primary" size="small" @click="getGoodsListByGoodsName">搜索</van-button>
                        </template></van-search
                    >

                    <div v-for="item in goodsList" :key="item.goodsId">
                        <van-card :num="item.count" :price="item.pirce" :desc="item.description" :title="item.goodsName" :thumb="item.url">
                            <template #footer>
                                <van-button size="mini" type="warning" @click="deleteGoodsById(item.goodsId)">删除</van-button>
                                <van-button size="mini" type="primary" @click="goToGoodsManger(1, item.goodsId)">修改</van-button>
                            </template>
                        </van-card>
                    </div>
                </div>
            </div>
        </div>
        <van-dialog v-model="show" title="账号充值" :overlay="false" show-cancel-button @confirm="rechargeMoney">
            <!-- 充值金额 -->
            <div class="money">
                <van-field v-model="money" placeholder="请输入充值金额" type="number" label="金额:" />
            </div>
            <!-- <van-divider /> -->
            <!-- 密码输入框 -->
            <van-password-input :value="payValue" :focused="showKeyboard" @focus="showKeyboard = true" />
        </van-dialog>

        <!-- 数字键盘 -->
        <van-number-keyboard v-model="payValue" :show="showKeyboard" @blur="showKeyboard = false" />
    </div>
</template>
<script>
    import axios from 'axios';
    import { Dialog, Toast, Notify } from 'vant';
    import { userDetailByUserId, updateUserDetailByUserId, getGoodsListByGoodsName, deleteGoodsByGoodsId, getUserMoney, rechargeMoney } from '@/api/index';
    import store from '@/store/store';
    export default {
        name: 'AppFind',
        data() {
            return {
                userInfoDetail: {
                    avator: '',
                    nickName: '',
                    gender: null,
                    birthday: '',
                },
                showPicker: false,
                isDisabled: true,
                conIsDisable: true,
                goodsName: '',
                userID: '',
                userType: '0',
                goodsList: [],
                moneyFound: 0,
                show: false,
                money: '',
                payValue: '',
                showKeyboard: false,
                number: '',
            };
        },
        created() {
            let { userID, userType } = store.state.userInfo;
            this.userType = userType;
            this.userID = userID;
            console.log(userID);
            this.getUserDetailByUserId(userID);
            this.getUserMoneyByUserId(userID);
        },
        methods: {
            clickCharge() {
                this.show = true;
            },
            editUserInfo() {
                this.isDisabled = false;
                this.conIsDisable = false;
            },
            formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            },
            onSearch() {
                // Toast(val);
            },
            onCancel() {
                // Toast('取消');
            },
            beforeClose() {
                this.money = '';
                this.payValue = '';
                this.show = false;
            },
            goToGoodsManger(type, goodsId) {
                this.$router.push({
                    path: '/goodsManger',
                    query: {
                        type,
                        goodsId,
                    },
                });
            },
            deleteGoodsById(goodsId) {
                Dialog.confirm({
                    title: '确认',
                    message: '是否确认删除该商品？',
                })
                    .then(() => {
                        deleteGoodsByGoodsId({ goodsId }).then((res) => {
                            if (res.status == 200) {
                                Toast('商品删除成功！');
                            }
                        });
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            clickDelete(id) {
                Dialog.confirm({
                    title: '信息确认',
                    message: '是否确认删除该商品？',
                })
                    .then(() => {
                        // on confirm
                        this.deleteGoodsById(id);
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            async afterRead(file) {
                //   此时可以自行将文件上传至服务器
                console.log(file); //file文件如下图
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                axios
                    .post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        // console.log(res);
                        this.userInfoDetail.avator = `http://127.0.0.1:7001/public/uploads/${res.data.data}`;
                        console.log(this.userInfoDetail.avator);
                    });
            },
            onConfirm() {
                showPicker = false;
            },
            async getUserDetailByUserId(userId) {
                let data = await userDetailByUserId({ userId }).catch();
                if (data.data.status == true) {
                    this.userInfoDetail = data.data.data.result[0];
                }
                console.log(data);
            },
            async updateUserDetailByUserId() {
                this.userInfoDetail.birthday = this.formatDate(this.userInfoDetail.birthday);
                let data = await updateUserDetailByUserId({ ...this.userInfoDetail, userID: this.userID }).catch(() => {});
                if (data.status == 200) {
                    this.getUserDetailByUserId(this.userID);
                    this.isDisabled = true;
                    this.conIsDisable = true;
                }
            },
            async getGoodsListByGoodsName() {
                let data = await getGoodsListByGoodsName({ goodsName: this.goodsName }).catch(() => {});
                if (data.status == 200) {
                    console.log(data);
                    this.goodsList = data.data.data.result ? data.data.data.result : [];
                    console.log(this.goodsList);
                }
            },
            async getUserMoneyByUserId(userID) {
                let data = await getUserMoney({ userID }).catch(() => {});
                if (data.status == 200) {
                    console.log(data);
                    this.moneyFound = data.data.data.data[0].moneyFound ? parseFloat(data.data.data.data[0].moneyFound).toFixed(2) : '0.00';
                    console.log('111', this.moneyFound);
                }
            },
            async rechargeMoney() {
                let data = await rechargeMoney({ userID: this.userID, moneyFound: this.money, password: this.payValue }).catch(() => {});
                if (data.status == 200) {
                    if (data.data.data.status == true) {
                        Notify({ type: 'success', message: data.data.data.message });
                        this.money = '';
                        this.payValue = '';
                        this.show = false;
                        this.getUserDetailByUserId(this.userID);
                    }
                    if (data.data.data.status == false) {
                        Notify({ type: 'warning', message: data.data.data.message });
                        this.money = '';
                        this.payValue = '';
                        this.show = false;
                        this.getUserDetailByUserId(this.userID);
                    }
                }
            },
        },
    };
</script>
<style lang="less" scoped>
.find {
    width: 98vw;
    height: calc(100vh);
    background-color: rgb(245, 247, 247);
    margin: 0 auto;
    overflow-y: auto;
    .my {
        .van-dialog {
            background-color: rgb(202, 197, 197);
        }
        .update-user-Info {
            .van-field {
                background-color: rgb(245, 247, 247);
            }

            .money-box {
                height: 40px;
                width: 90vw;
                margin: 0 auto;
                border-bottom: 1px solid #ebedf0;
                .money {
                    float: left;
                    height: 40px;
                    width: 40vw;
                    line-height: 40px;
                    font-size: 14px;
                    text-align: left;
                    color: rgb(104, 102, 102);
                }
                .charge {
                    float: right;
                    height: 40px;
                    width: 50px;
                    line-height: 40px;
                    font-size: 14px;
                    text-align: right;
                    color: rgb(243, 20, 20);
                }
            }
        }
        .goods-manger {
            p {
                height: 30px;
                width: 90vw;
                margin: 0 auto;
                font-size: 16px;
            }
            .goods-add {
                width: 90vw;
                height: 30px;
                margin: 0 auto;
                // border-top: 1px rgb(195, 197, 201) solid;
                border-bottom: 1px rgb(240, 242, 245) solid;
                .title {
                    display: block;
                    width: 45vw;
                    height: 30px;
                    float: left;
                    line-height: 30px;
                    text-align: left;
                    font-size: 14px;
                    color: rgb(42, 43, 41);
                }
                .btn {
                    display: block;
                    width: 45vw;
                    float: right;
                    height: 30px;
                    text-align: right;
                    line-height: 30px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>