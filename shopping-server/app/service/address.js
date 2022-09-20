const await = require('await-stream-ready/lib/await');

const Service = require('egg').Service;
const ADDERESS_TABE = 'address'
class AddressService extends Service {
    /**
     * 添加收获地址
     * @param {String} userID 
     * @param {String} addressDetail 
     * @param {String} areaCode 
     * @param {String} city 
     * @param {String} county 
     * @param {String} postalCode 
     * @param {String} province 
     * @param {String} tel 
     * @param {String} name 
     * @returns 
     */
    async addAddress(userID,addressDetail,areaCode,city,county,postalCode,province,tel,name) {
        const {app} = this
        let result =  await app.mysql.insert(ADDERESS_TABE,{
            userID,
            addressDetail,
            areaCode,
            city,
            county,
            postalCode,
            province,
            tel,
            name
        })
          // 判断添加成功
          const insertSuccess = result.affectedRows === 1;
          if (insertSuccess) {
              return {
                  context: '添加成功',
                  status: true
              }
          }
        }
        /**
     * 修改收货地址
     * @param {String} userID 
     * @param {String} addressDetail 
     * @param {String} areaCode 
     * @param {String} city 
     * @param {String} county 
     * @param {String} postalCode 
     * @param {String} province 
     * @param {String} tel 
     * @param {String} name 
     * @returns 
     */
        async upadteAddress(userID,addressDetail,areaCode,city,county,postalCode,province,tel,name) {
            const {app} = this
            let result =  await app.mysql.update(ADDERESS_TABE,{
                addressDetail,
                areaCode,
                city,
                county,
                postalCode,
                province,
                tel,
                name
            }, {
                where: {
                    userID
                }})
              // 判断添加成功
              const insertSuccess = result.affectedRows === 1;
              if (insertSuccess) {
                  return {
                      context: '修改成功',
                      status: true
                  }
              }
        }
        /**
         * 查询收货地址
         * @param {String} userID 
         * @returns 
         */
        async queryAddressByUserId(userID){
             const {app} = this
             let result = await app.mysql.select(ADDERESS_TABE,{
                 where:{userID}
             })
             return {
                 result,
                 status:true,
             }
        }
        async deleteAddressByUserId(userID) {
            const {app} = this
            let result = await app.mysql.delete(ADDERESS_TABE,{
                userID
            })
           
       // 判断添加成功
       const deleteSuccess = result.affectedRows === 1;
       if (deleteSuccess) {
        return {
            result,
            status:true,
        }
       }
        }
}
module.exports = AddressService