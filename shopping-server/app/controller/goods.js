const Controller = require('egg').Controller;
class GoodsController extends Controller {
    //生成商品goodsId
    async generateGoodsNo() {
        const { ctx } = this
        let Rand = Math.random()
        let goodsId = Math.round(Rand * 100000000)
        let data = {
            goodsId,
            status: true
        }
        ctx.body = {
            data
        }
    }
    //添加商品
    async addGoods() {
        const { ctx } = this
        let { goodsId, goodsName, url, pirce, description, stock, goodsClassify, isRecommend, swiper } = ctx.request.body
        const data = await ctx.service.goods.addGoods(goodsId, goodsName, url, pirce, description, stock, goodsClassify, isRecommend, swiper)
        ctx.body = {
            data
        }
    }
    async deleteGoodsByGoodsId() {
        const { ctx } = this
        let { goodsId } = ctx.request.body
        const data = await ctx.service.goods.deleteGoodsByGoodsId(goodsId)
        ctx.body = {
            data
        }
    }
    //通过goodsId查询商品
    async getGoodsById() {
        const { ctx } = this
        let { goodsId } = ctx.request.body
        const data = await ctx.service.goods.getGoodsById(goodsId)
        ctx.body = {
            data
        }
    }
    //通过商品名查询商品
    async getGoodsListByGoodsName() {
        const { ctx } = this
        let { goodsName, page, size } = ctx.request.body
        const data = await ctx.service.goods.getGoodsListByGoodsName(goodsName, page, size)
        ctx.body = {
            data
        }
    }
    //分页查询商品
    async getGoodsList() {
        const { ctx } = this
        let { page, size } = ctx.request.body
        const data = await ctx.service.goods.getGoodsList(page, size)
        ctx.body = {
            data
        }
    }
    //添加商品详细图
    async addGoodsDetailImg() {
        const { ctx } = this
        let { imgs, goodsId } = ctx.request.body
        const data = await ctx.service.goods.addGoodsDetailImg(imgs, goodsId)
        ctx.body = {
            data
        }
    }
    //获取商品详细图
    async getGoodsDetailImgById() {
        const { ctx } = this
        let { goodsId } = ctx.request.body
        const data = await ctx.service.goods.getGoodsDetailImgById(goodsId)
        ctx.body = {
            data
        }
    }
    //获取swiper图
    async getGoodsSwiper() {
        const { ctx } = this
        let { swiperSize } = ctx.request.body
        const data = await ctx.service.goods.getGoodsSwiper(swiperSize)
        ctx.body = {
            data
        }
    }
    //商品分类
    async getClassifyGoods() {
        const { ctx } = this
        let { goodsClassify } = ctx.request.body
        const data = await ctx.service.goods.getClassifyGoods(goodsClassify)
        ctx.body = {
            data
        }
    }

}
module.exports = GoodsController