<template>
  <div class="edit-address">
      <div class="nav-bar">
            <van-nav-bar  right-text="" :title="title" :left-arrow="true" @click-left="onClickLeft">
                </van-nav-bar>
        </div>
      <van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  :address-info='info'
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="saveAddress"
  @delete="onDelete"
/>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import store from '@/store/store'
import {addAddress,updateAddress,queryAddressByUserId,deleteAddress} from '@/api/index'
export default {
 data() {
    return {
      areaList,
      title:'',
      info: {},
      userID:'',
      type:null
    };
  },
  created(){
   let { userID}  = store.state.userInfo
   let {type} = this.$route.query
   this.type = type
   this.userID = userID
   if(type == 1) {
    this.queryAddressByUserId(userID)
    this.title = '修改收货地址'
   }else if(type == 0){
        this.title = '修改收货地址'
   }

  },
  methods: {
          onClickLeft() {
                this.$router.go(-1);
                console.log(this.$route);
            },
    onSave(val) {
      Toast('save');
      console.log(val)
      this.addAddress(val)
    },
    onDelete() {
      Toast('delete');
    },
  async  saveAddress(obj){
      if(this.type == 0){
            let data = await addAddress({...obj,userID:this.userID}).catch(()=>{})
        if(data.status == 200) {
           Toast({
             message: '添加成功',
             duration: 1000,
             forbidClick: true
            });
            this.$router.go(-1)
        }
      }else if(this.type == 1){
            let data = await updateAddress({...obj,userID:this.userID}).catch(()=>{})
             if(data.status == 200) {
            Toast({
             message: '修改成功',
             duration: 1000,
             forbidClick: true
            });
            this.$router.go(-1)
        }
      }
      
    },
    async queryAddressByUserId(userID){
          let data = await queryAddressByUserId({userID}).catch(()=>{})
          if(data.status == 200) {
              console.log(data)
              this.info = data.data.data.result[0]?data.data.data.result[0]:{}
          }
    },
    async onDelete(){
        let data = await deleteAddress({userID:this.userID}).catch(()=>{})
        if(data.status == 200) {
            this.info = {}
             Toast('删除成功')
        }
    }
  },
}
</script>

<style>

</style>