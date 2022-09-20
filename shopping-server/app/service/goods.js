const Service = require('egg').Service;
const md5 = require('js-md5')
// 时间处理库
const moment = require('moment')
const GOODS = 'goods'
const IMAGE = 'image'
class GoodsService extends Service {
    /**
    *
    * 添加商品
    * @param {object} data
    * @return {object} 
    * @memberof Goods
    */
    async addGoods(goodsId, goodsName, url, pirce, description, stock, goodsClassify, isRecommend, swiper) {
        const { app } = this
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        let row = {
            goodsId,
            goodsName,
            url,
            pirce,
            description,
            stock,
            goodsClassify,
            isRecommend,
            date,
            swiper
        }
        let result = await app.mysql.insert(GOODS, {
            ...row
        })
        const insertSuccess = result.affectedRows === 1
        if (insertSuccess) {
            return {
                content: '添加商品成功',
                status: true,
            }
        }
    }
    async deleteGoodsByGoodsId(goodsId) {
        const { app } = this
        let result = await app.mysql.delete(GOODS, {
            where: {
                goodsId
            }
        })
        const deleteSuccess = result.affectedRows === 1
        if (deleteSuccess) {
            return {
                content: '删除商品成功',
                status: true,
            }
        }

    }
    /**
  *
  * 通过goodsId查看商品详情
  * @param {String} goodsID
  * @return {object} 
  * @memberof Goods
  */
    async getGoodsById(goodsID) {
        const { app } = this
        let result = await app.mysql.select(GOODS, {
            where: { goodsID }
        })
        return {
            result,
            status: true
        }
    }
    /**
 *
 * 通过goodsName查询商品，支持模糊
 * @param {String} gooodsName
 * @return {object} 
 * @memberof Goods
 */
    async getGoodsListByGoodsName(goodsName, page, size) {
        const { app } = this
        if (goodsName == '') {
            return {
                result: [],
                status: true
            }
        } else {
            page = parseInt(page)
            page < 0 ? page = 0 : null;
            size = parseInt(size)
            // 根据page执行对应sql
            const QUERY_STR = 'goodsId, goodsName, description, url, pirce,stock,goodsClassify,isRecommend';
            // let sql = `select ${QUERY_STR} from ${GOODS} where goodsName like "%${goodsName}%" order by date desc limit ?,? `;
            const result = await app.mysql.query(`select ${QUERY_STR} from ${GOODS} where goodsName like "%${goodsName}%" order by date desc limit ?,? `, [(page - 1) * size, page * size]);
            return {
                result,
                status: true
            };
        }

    }
    /**
     *
     * 获取商品列表
     * @param {Number} page
     ** @param {Number} size
     * @return {object} 
     * @memberof Goods
     */
    async getGoodsList(page, size) {
        const { app } = this;
        page = parseInt(page)
        page < 0 ? page = 0 : null;
        size = parseInt(size)
        // 根据page执行对应sql
        const result = await app.mysql.query(`select * from ${GOODS} order by date desc limit ?,? `, [(page - 1) * size, page * size])
        return {
            result,
            status: true
        };
    }
    /**
*
* 通过goodsId添加商品详情图片
* @param {Array} imgs
* @param {String} goodsId
* @return {object}
* @memberof Goods
*/
    async addGoodsDetailImg(imgs, goodsId) {
        const { app } = this
        for (let img of imgs) {
            let url = img.url
            await app.mysql.insert(IMAGE, {
                url,
                goodsId
            })
        }
        return {
            status: true
        }
    }
    /**
*
* 通过goodsId获取商品详情图片
* @param {String} goodsId
* @return {object}
* @memberof Goods
*/
    async getGoodsDetailImgById(goodsId) {
        const { app } = this
        let result = await app.mysql.select(IMAGE, {
            where: { goodsId }// WHERE 条件
        })
        return {
            result,
            status: true
        }
    }
    /**
*
* 通过goodsId 查看商品swiper
 * @param {Number} size
* @return {object}
* @memberof Goods
*/
    async getGoodsSwiper(size) {
        const { app } = this
        let page = 1
        page = parseInt(page)
        page < 0 ? page = 0 : null;
        size = parseInt(size)
        let result = await app.mysql.query(`select * from ${GOODS} where isRecommend='1'order by date desc limit ?,? `, [(page - 1) * size, page * size])
        return {
            result,
            status: true
        }
    }
    /**
     * 
     * @param {Menu} goodsClassify 
     */
    async getClassifyGoods(goodsClassify) {
        const { app } = this
        let result = await app.mysql.select(GOODS, {
            where: { goodsClassify }// WHERE 条件
        })
        return {
            result,
            status: true
        }
    }
}
module.exports = GoodsService