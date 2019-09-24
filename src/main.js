// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;

// 引入swiper
import Swiper from 'swiper'
Vue.prototype.$swiper = Swiper;
import '../node_modules/swiper/dist/css/swiper.min.css'
// 引入base.css文件
import '../src/assets/css/base.css'
// 引入remScale.js文件
import '../src/assets/js/remScale'
// 引入阿里字体图标 和vant图标配合使用
import './assets/css/iconfont/iconfont.css'

// 引入vant組件
import { Button } from 'vant';
Vue.use(Button);
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
// 侧边导航
import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);
// 引入vant Icon
import { Icon } from 'vant';
Vue.use(Icon);
// 引入步进器
import { Stepper } from 'vant';
Vue.use(Stepper);

// 引入 time-stamp 插件
import time from 'time-stamp'
Vue.filter("time", time)

//引入U函数
  import U from './assets/common/U'
  Vue.prototype.$U = U;
//at.alicdn.com/t/font_1383618_vvib0376e4.css
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
