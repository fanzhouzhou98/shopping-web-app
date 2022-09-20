const Service = require('egg').Service;
// 时间处理库
const moment = require('moment')
const ORDER_TABLE = 'orders'
const GOODS_TABLE = 'goods'
const ADDRESS_TABLE = 'address'
class OrderService extends Service {
    /**
       *
       * 创建订单
       * @param {String} userID
       * @param {String} goodsID
       * @param {String} gooodsName
       * @param {String} imgUrl
       * @param {Number} pirce
       * @return {object[]} 
       * @memberof Order
       */
    async createOrder(orderList) {
        const { app } = this
        for (let order of orderList) {
            const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            const result = await app.mysql.insert(ORDER_TABLE, {
                userID: order.userID,
                goodsID: order.goodsID,
                addressID: order.addressID,
                count: order.count,
                date
            })
        }
        return {
            status: true
        }
    }
    /**
     *
     * 获取订单
     * @param {String} userID
     * @param {Number} size
     * @param {Number} page
     * @return {object[]} 
     * @memberof Order
     */
    async getOrderByUserId(userId) {
        const { app } = this
        let sql = `select ${ORDER_TABLE}.date,${ORDER_TABLE}.orderID,${ORDER_TABLE}.commentStatus,${ORDER_TABLE}.count,${ORDER_TABLE}.payStatus,${ADDRESS_TABLE}.name,${ADDRESS_TABLE}.addressDetail,${ADDRESS_TABLE}.city,${ADDRESS_TABLE}.county,${ADDRESS_TABLE}.province,${ADDRESS_TABLE}.tel,${GOODS_TABLE}.goodsId,${GOODS_TABLE}.goodsName,${GOODS_TABLE}.url,${GOODS_TABLE}.pirce from ${ORDER_TABLE} right join ${ADDRESS_TABLE} on ${ORDER_TABLE}.userID=${ADDRESS_TABLE}.userID right join ${GOODS_TABLE} on ${ORDER_TABLE}.goodsID=${GOODS_TABLE}.goodsId where ${ORDER_TABLE}.userID='${userId}'`
        const result = await app.mysql.query(sql);
        console.log(result)
        return {
            result,
            status: true
        }
    }
    /**
     *
     * 获取订单详情
     * @param {String} userID
     * @return {object[]} 
     * @memberof Order
     */
    async getOrderDetailById(orderId) {
        const { app } = this
        const result = await app.mysql.get(ORSER_TABLE, {
            orderId
        })
        return {
            result,
            status: true
        }
    }
    /**
     *
     * 订单支付
     * @param {String} orderID
     * @return {object[]} 
     * @memberof Order
     */
    async changeOrderPayStatus(orderID) {
        const { app } = this
        const result = await app.mysql.update(ORDER_TABLE, {
            payStatus: '1',
        }, {
            where: {
                orderID
            }
        })
        // 判断更新成功
        const updateSuccess = result.affectedRows === 1;
        if (updateSuccess) {
            let orderGoodsId = await app.mysql.query(`select goodsId from ${ORDER_TABLE} where orderID=${orderID}`)
            let goodsId = orderGoodsId[0].goodsId
            let goodsStock = await app.mysql.query(`select stock from ${GOODS_TABLE} where goodsId=${goodsId}`)
            let stock = goodsStock[0].stock
            stock = stock - 1;
            await app.mysql.update(GOODS_TABLE, {
                stock
            }, {
                where: {
                    goodsId
                }
            })
            return {
                message: '付款完成',
                status: true
            }
        }

    }
    /**
     * 删除订单
     * @param {String} orderID 
     * @returns 
     */
    async deleteOrder(orderID) {
        const { app } = this
        const result = await app.mysql.delete(ORDER_TABLE, {
            orderID
        })
        const deleteSuccess = result.affectedRows === 1;
        if (deleteSuccess) {
            return {
                message: '订单删除成功',
                status: true
            }
        }
    }
}
module.exports = OrderService