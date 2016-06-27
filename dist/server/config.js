'use strict';

var ENV = 'production';
var IS_PRO = ENV === 'production';

module.exports = {
  ENV: ENV,
  IS_PRO: IS_PRO,

  port: process.env.PORT || 8080,

  publicPath: IS_PRO ? 'http://localhost:8082/' : '/',

  qiniu: { // 使用cdn时需要注意css中引用的font有跨域问题
    access: 'access',
    secret: 'secret',
    bucket: 'bucket'
  },

  wechat: {
    appid: 'appid',
    secret: 'secret'
  }
};