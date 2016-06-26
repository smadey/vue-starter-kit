
import './cdn-shim';

import Vue from 'vue';

import App from './containers/App.vue';

// import { initShare } from './utils/wechat';

new Vue({
  el: 'body',
  components: { App },
});

// initShare({
//   title: 'Hello, Vue',
//   description: 'Hello, Vue',
//   imgUrl: require('file!./path/to/image'),
// });
