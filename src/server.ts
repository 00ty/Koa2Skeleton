const path = require('path');

// 载入配置
const dotenv = require('dotenv');
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({
  path: envPath,
  encoding: 'utf8',
  debug: false
});

// 载入日志
import Logger from './utils/Logger';

// 载入数据库
import { initDatabase } from './utils/Database';

// 载入Koa
import Koa from 'koa';
// 载入中间件
import { jsonMiddle, errorMiddle } from './utils/Middleware';
let bodyParser: any;
try {
  bodyParser = require('koa-bodyparser');
} catch {}

const app = new Koa();

app.use(jsonMiddle);
app.use(errorMiddle);
if (bodyParser) {
  app.use(bodyParser());
}

// 载入路由
import router from './router'
app.use(router.routes())

const port = Number(process.env.WEB_PORT) || 3000;
app.on('error', (err) => {
  Logger.error('Koa错误', err);
});

initDatabase()
  .then(() => {
    app.listen(port, () => {
      Logger.info(`项目运行于: http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    Logger.error('启动失败，数据库不可用', err);
    process.exit(1);
  });