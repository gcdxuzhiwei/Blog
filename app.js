// 引用express框架
const express = require('express');
// 处理路径
const path = require('path');

// 导入express-session模块
const session = require('express-session');


// 导入dateFormat第三方模块
const dateFormat = require('dateformat');

// 导入morgan模块
const morgan = require('morgan');

// 导入config模块
const config = require('config');

// 创建网站服务器
const app = express();

// 引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');

// 数据库连接
require('./model/connect');
// require在导入模块时会同时执行这个文件
require('./model/user');

// 处理post请求参数
app.use(bodyParser.urlencoded({
    extended: false
}));

// 配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    // 设置cookie过期时间
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// 导入art-template模板引擎
const template = require('art-template');

// 框架模板所在位置
app.set('views', path.join(__dirname, 'views'));
// 设置模板默认后缀
app.set('view engine', 'art');
// 渲染art 使用的模板引擎
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 开放静态资源文件
// 静态中外链资源是由浏览器解析的 是以服务器为准的 要改为绝对路径
app.use(express.static(path.join(__dirname, 'public')));


// 获取系统环境变量 返回值是对象
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    app.use(morgan('dev'));
    // 将客户端发送到服务器端的请求信息打印到控制台中
} else {
    // 当前是生产环境
}

// 拦截请求判断用户登陆状态
// 引入后会有一个返回值 返回值就是guard对象
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配路径
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口
app.listen(80);
console.log('服务器启动成功...');