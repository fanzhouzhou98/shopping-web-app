const Service = require('egg').Service;
// 时间处理库
const moment = require('moment')
const COMMENT_TABE = 'comment'
const USER_DETAIL_TABLE = 'user_detail'
const ORDER_TABLE = 'orders'
class CommentService extends Service {
    /**
      *
      * 插入新的comment数据
      * @param {string} avator //
      * @param {string} userID
      * @param {string} nickName
      * @param {string} goodsId
      * @param {string} contentText
      * @memberof Share
      */
    async insertComment(userID, goodsId, contentText, rate) {
        // 将数据插入
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const { app } = this;
        const result = await app.mysql.insert(COMMENT_TABE, {
            userID,
            goodsId,
            contentText,
            rate,
            date
        })

        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            return {
                context: '添加成功',
                status: true
            }
        }
    }
    async changeCommentStatua(orderID) {
        const { app } = this
        let result = await app.mysql.update(ORDER_TABLE, {
            commentStatus: '1',
        }, {
            where: {
                orderID
            }
        })
        // 判断添加成功
        const commentsSuccess = result.affectedRows === 1;
        if (commentsSuccess) {
            return {
                context: '评论完成',
                status: true
            }
        }
    }
    /**
     *
     * 返回分页数据 每页是10条
     * @param {number} page
     * @return {object[]} 
     * @memberof Share
     */
    async getCommentByPage(page, goodsID, size) {
        const { app } = this;
        let pageSize = size;
        page = parseInt(page)
        page < 0 ? page = 0 : null;
        // 根据page执行对应sql
        const result = await app.mysql.query(`select ${COMMENT_TABE}.contentText,${COMMENT_TABE}.date,${COMMENT_TABE}.rate,${COMMENT_TABE}.commentID,${USER_DETAIL_TABLE}.nickName,${USER_DETAIL_TABLE}.avator from ${COMMENT_TABE}  right join ${USER_DETAIL_TABLE} on ${COMMENT_TABE}.userID=${USER_DETAIL_TABLE}.userID where ${COMMENT_TABE}.goodsID=${goodsID} order by ${COMMENT_TABE}.date desc limit ?,? `, [(page - 1) * pageSize, page * pageSize])
        return {
            result,
            status: true
        };
    }

    /**
   *
   * 返回分页数据 每页是10条
   * @param {String} shareId
   * @return {object[]} 
   * @memberof Share
   */
    async deleteShareById(commentId) {
        const { app } = this
        let result = await app.mysql.delete(COMMENT_TABE, {
            commentId
        })
        // 判断更新成功
        const deleteSuccess = result.affectedRows === 1;
        if (deleteSuccess) {
            return {
                result,
                status: true
            }
        }
    }
}
module.exports = CommentService