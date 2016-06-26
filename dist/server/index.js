"use strict";

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}

var _path = require("path"), _path2 = _interopRequireDefault(_path), _bodyParser = require("body-parser"), _bodyParser2 = _interopRequireDefault(_bodyParser), _cookieParser = require("cookie-parser"), _cookieParser2 = _interopRequireDefault(_cookieParser), _express = require("express"), _express2 = _interopRequireDefault(_express), _wechatApi = require("wechat-api"), _wechatApi2 = _interopRequireDefault(_wechatApi), _config = require("./config"), app = (0, 
_express2["default"])(), wechatApi = new _wechatApi2["default"](_config.wechat.appid, _config.wechat.secret);

app.set("port", _config.port), app.set("views", _path2["default"].join(__dirname, "views")), 
app.set("view engine", "ejs"), app.engine("html", require("ejs").renderFile), app.use(_bodyParser2["default"].json()), 
app.use(_bodyParser2["default"].urlencoded({
    extended: !1
})), app.use((0, _cookieParser2["default"])()), app.use(_express2["default"]["static"](_path2["default"].join(__dirname, "../client/"))), 
app.get("/", function(req, res) {
    res.render("index.html", {
        publicPath: _config.publicPath
    });
}), app.get("/share", function(req, res) {
    var params = {
        debug: !1,
        jsApiList: [ "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo" ],
        url: req.headers.referer
    };
    wechatApi.getJsConfig(params, function(err, result) {
        if (err) throw new Error(err);
        res.send({
            code: 0,
            data: result
        });
    });
});

var webpack, webpackDevMiddleware, webpackHotMiddleware, webpackConfig, compiler;

app.listen(_config.port, function() {
    console.log("[服务器启动],端口: " + _config.port);
});