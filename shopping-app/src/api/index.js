/*
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-04 20:09:48
 */
import { post, get } from "@/http/axios";
export function getList(params) {
    return get(
        '/',
        params
    )
}
export function register(params) {
    return post(
        '/user/register',
        params
    )
}
export function login(params) {
    return post(
        '/user/login',
        params
    )
}
export function getAvator(params) {
    return post(
        '/user/getAvator',
        params
    )
}
export function upload(params) {
    return post(
        '/upload',
        params
    )
}
export function addGoods(params) {
    return post(
        '/goods/addGoods',
        params
    )
}
export function getGoodsListPage(params) {
    return post(
        '/goods/getGoodsList',
        params
    )
}
export function generateGoodsNo(params) {
    return get(
        '/goods/generateGoodsNo',
        params
    )
}
export function addGoodsDetailImg(params) {
    return post(
        '/goods/addGoodsDetailImg',
        params
    )
}
export function getGoodsDetailImgById(params) {
    return post(
        '/goods/getGoodsDetailImgById',
        params
    )
}
export function getGoodsById(params) {
    return post(
        '/goods/getGoodsById',
        params
    )
}
export function getInfoByName(params) {
    return post(
        '/user/getInfo',
        params
    )
}
export function userDetailByUserId(params) {
    return post(
        '/user/userDetail',
        params
    )
}
export function updateUserDetailByUserId(params) {
    return post(
        '/user/updateUserDetail',
        params
    )
}
export function getGoodsListByGoodsName(params) {
    return post(
        '/goods/getGoodsListByGoodsName',
        params
    )
}
export function addAddress(params) {
    return post(
        '/user/addAddress',
        params
    )
}
export function updateAddress(params) {
    return post(
        '/user/updateAddress',
        params
    )
}
export function queryAddressByUserId(params) {
    return post(
        '/user/queryAddressByUserId',
        params
    )
}
export function deleteAddress(params) {
    return post(
        '/user/deleteAddress',
        params
    )
}
export function createOrder(params) {
    return post(
        '/order/createOrder',
        params
    )
}
export function getOrderByUserId(params) {
    return post(
        '/order/getOrderByUserId',
        params
    )
}
export function changeOrderPayStatus(params) {
    return post(
        '/order/changeOrderPayStatus',
        params
    )
}
export function deleteOrder(params) {
    return post(
        '/order/deleteOrder',
        params
    )
}
export function insertComment(params) {
    return post(
        '/comment/insertComment',
        params
    )
}
export function getCommentPage(params) {
    return post(
        '/comment/getCommentPage',
        params
    )
}
export function deleteGoodsByGoodsId(params) {
    return post(
        '/goods/deleteGoodsByGoodsId',
        params
    )
}
export function getGoodsSwipers(params) {
    return post(
        '/swiper/getSwiper',
        params
    )
}
export function getClassifyGoods(params) {
    return post(
        '/goods/getClassifyGoods',
        params
    )
}
export function createMoney(params) {
    return post(
        '/money/createMoney',
        params
    )
}
export function updateMoney(params) {
    return post(
        '/money/updateMoney',
        params
    )
}
export function rechargeMoney(params) {
    return post(
        '/money/rechargeMoney',
        params
    )
}
export function getUserMoney(params) {
    return post(
        '/money/getUserMoney',
        params
    )
}
