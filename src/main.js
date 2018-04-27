// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {ImgLazyLoader} from '../plugins';

Vue.config.productionTip = false

Vue.use(ImgLazyLoader, {
  defSrcConfig: {
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524828312703&di=7fb9df3cabaa34b82bb2ebe70a7ff775&imgtype=0&src=http%3A%2F%2Fimg.hongtongad.com%2F201710%2F30%2F2406b851-4f8d-444c-8209-b8f8f01d2bac.jpg',
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})
