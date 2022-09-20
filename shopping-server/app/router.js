'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, } = app;
  router.get('/', controller.home.index);
  //文件上传
  router.post('/upload', app.jwt, controller.fileUpload.upload);
  //生成商品goodsId
  router.get('/goods/generateGoodsNo', app.jwt, controller.goods.generateGoodsNo);
  //添加商品
  router.post('/goods/addGoods', app.jwt, controller.goods.addGoods);
  //添加商品详情图
  router.post('/goods/addGoodsDetailImg', app.jwt, controller.goods.addGoodsDetailImg)
  //获取商品详情图
  router.post('/goods/getGoodsDetailImgById', app.jwt, controller.goods.getGoodsDetailImgById)
  //获取商品列表
  router.post('/goods/getGoodsList', app.jwt, controller.goods.getGoodsList)
  //商品分类
  router.post('/goods/getClassifyGoods', app.jwt, controller.goods.getClassifyGoods)
  //通过goodsId获取商品信息
  router.post('/goods/getGoodsById', app.jwt, controller.goods.getGoodsById)
  //获取首页推荐图
  router.post('/swiper/getSwiper', app.jwt, controller.goods.getGoodsSwiper)
  //通过goodsName查询商品
  router.post('/goods/getGoodsListByGoodsName', app.jwt, controller.goods.getGoodsListByGoodsName)
  //删除商品
  router.post('/goods/deleteGoodsByGoodsId', app.jwt, controller.goods.deleteGoodsByGoodsId)
  //通过userId获取用户详细信息
  router.post('/user/userDetail', app.jwt, controller.user.getInfoByUserID);
  //修改用户详细信息
  router.post('/user/updateUserDetail', app.jwt, controller.user.updateUserInfo)
  //添加收货地址
  router.post('/user/addAddress', app.jwt, controller.address.addAddress)
  //修改收货地址
  router.post('/user/updateAddress', app.jwt, controller.address.updateAddress)
  //查询收货地址
  router.post('/user/queryAddressByUserId', app.jwt, controller.address.queryAddressByUserId)
  //删除收货地址
  router.post('/user/deleteAddress', app.jwt, controller.address.deleteAddressByUserId)
  //创建订单
  router.post('/order/createOrder', app.jwt, controller.order.createOrder)
  //获取订单
  router.post('/order/getOrderByUserId', app.jwt, controller.order.getOrderByUserId)
  //顶单支付
  router.post('/order/changeOrderPayStatus', app.jwt, controller.order.changeOrderPayStatus)
  //删除订单
  router.post('/order/deleteOrder', app.jwt, controller.order.deleteOrder)
  //发表评论
  router.post('/comment/insertComment', app.jwt, controller.comment.insertComment)
  //分页获取商品评论
  router.post('/comment/getCommentPage', app.jwt, controller.comment.getCommentByPage)
  //获取头像
  router.post('/user/getAvator', controller.user.getAvator)
  // 使用post进行注册 参数 username password(md5加密后的) date
  router.post('/user/register', controller.user.register);
  // 登录路由 参数与注册一致
  router.post('/user/login', controller.user.login);
  // 获取用户信息 参数：username
  router.post('/user/getInfo', app.jwt, controller.user.getInfo);
  // 根据userID获取用户信息
  router.post('/user/getInfoByID', app.jwt, controller.user.getInfoByUserID);
  //创建钱包
  router.post('/money/createMoney', app.jwt, controller.money.createMoney)
  //付款操作
  router.post('/money/updateMoney', app.jwt, controller.money.updateMoney)
  //账户充值
  router.post('/money/rechargeMoney', app.jwt, controller.money.rechargeMoney)
  //获取用户钱包金额
  router.post('/money/getUserMoney', app.jwt, controller.money.getUserMoney)
};
