const Service = require('egg').Service;
const SHARE_TABE = 'share'
class ShareService extends Service {
    /**
      *
      * 插入新的share数据
      * @param {string} avator //
      * @param {string} userID
      * @param {string} nickName
      * @param {string} contentText
      * @param {string} contentImgSrc
      * @memberof Share
      */
    async insertShare(avator, userID, nickName, contentText, contentImgSrc) {
        // 将数据插入
        const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const { app } = this;
        const result = await app.mysql.insert(SHARE_TABE, {
            avator,
            userID,
            nickName,
            contentImgSrc,
            contentText,
            date
        })
        // 判断添加成功
        const deleteSuccess = result.affectedRows === 1;
        if (deleteSuccess) {
            return {
                context: '添加成功',
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
    async getShareByPage(page) {
        const { app } = this;
        let pageSize = 10
        page = parseInt(page)
        page < 0 ? page = 0 : null;
        // 根据page执行对应sql
        const result = await app.mysql.query(`select * from ${SHARE_TABE} order by date desc limit ?,? `, [(page - 1) * pageSize, page * pageSize])
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
    async deleteShareById(shareId) {
        const { app } = this
        let result = await app.mysql.delete(SHARE_TABE, {
            shareId
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
module.exports = ShareService