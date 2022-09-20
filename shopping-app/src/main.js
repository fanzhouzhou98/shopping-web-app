/*
 * @Author: fanzhouzhou
 * @Descripttion: 
 * @Date: 2022-03-01 09:05:51
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store';
import Vant, {
  Lazyload, Toast, Dialog,
  GoodsAction, GoodsActionIcon,
  GoodsActionButton, Stepper, Badge,
  RadioGroup, Radio, AddressList,
  PasswordInput, NumberKeyboard, Rate,
  Notify, TreeSelect, Loading
} from 'vant';
import 'vant/lib/index.css';

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Vant);
Vue.use(Lazyload)
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Stepper);
Vue.use(Badge);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(AddressList);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Rate);
Vue.use(Notify);
Vue.use(TreeSelect);
Vue.use(Loading);
// Vue.prototype.$echarts = echarts 
// window.echarts = echarts;
// Vue.prototype.$http = network;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
