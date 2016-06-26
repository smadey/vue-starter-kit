import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import WechatAPI from 'wechat-api';

import { port, publicPath, wechat } from './config';

const app = express();

const wechatApi = new WechatAPI(wechat.appid, wechat.secret);

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 基础配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/')));

app.get('/', (req, res) => {
  res.render('index.html', { publicPath });
});

app.get('/share', (req, res) => {
  const params = {
    debug: false,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'],
    url: req.headers.referer,
  };

  wechatApi.getJsConfig(params, (err, result) => {
    if (err) {
      throw new Error(err);
    }
    res.send({ code: 0, data: result });
  });
});

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const webpackConfig = require('../../build/webpack.config.js');

  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.listen(port, () => {
  console.log(`[服务器启动],端口: ${port}`); // eslint-disable-line no-console
});
