const path = require('path');

import { MD5,Check } from './utils/String'

// console.log(Number.isInteger('a'));



// console.log(MD5('123456'));

// console.log(Check('7',['1','2','3','4']));

// process.exit();
// 载入配置
const dotenv = require('dotenv');
dotenv.config({
  path: path.join(__dirname, `./.env`),
  encoding: 'utf8', // 编码方式，默认utf8
  debug: false // 是否开启debug，默认false
}).parsed;

// 载入日志
import Logger from './utils/Logger';
global.logger = Logger;

// 载入数据库
require('./utils/Database');

// 载入Koa
import Koa from 'koa';
// 载入中间件
import { jsonMiddle } from './utils/Middleware';

const app = new Koa();

app.use(jsonMiddle);

// 载入路由
import router from './router'
app.use(router.routes())

app.listen(process.env.WEB_PORT, () => {
  global.logger.info(`项目运行于: http://127.0.0.1:${process.env.WEB_PORT}`);
});