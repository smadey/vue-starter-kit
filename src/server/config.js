
const ENV = process.env.NODE_ENV;
const IS_PRO = ENV === 'production';

module.exports = {
  ENV: ENV,
  IS_PRO: IS_PRO,

  port: process.env.PORT || 8080,

  publicPath: IS_PRO ? '/' : '/',

  qiniu: { // 使用cdn时需要注意css中引用的font有跨域问题
    access: 'access',
    secret: 'secret',
    bucket: 'bucket',
  },

  wechat: {
    appid: 'appid',
    secret: 'secret',
  },
};
