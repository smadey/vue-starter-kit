
const ENV = process.env.NODE_ENV;
const IS_PRO = ENV === 'production';

module.exports = {
  ENV: ENV,
  IS_PRO: IS_PRO,

  port: process.env.PORT || 8080,

  publicPath: IS_PRO ? '/' : '/', // 上传到CDN需要调整此路径，如：'http://localhost:8082/client/'

  qiniu: { // 使用CDN时需要注意CSS中引用的Font有跨域问题
    access: 'access',
    secret: 'secret',
    bucket: 'bucket',
  },

  wechat: {
    appid: 'appid',
    secret: 'secret',
  },
};
