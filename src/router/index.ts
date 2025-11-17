import Router from 'koa-router';

const router = new Router()


import demoController from './../app/controller/demo';

router.get('/', demoController.test)
router.get('/demo', demoController.getPagedData)
router.get('/health', async (ctx) => {
  ctx.status = 200;
  ctx.body = { code: 0, message: 'ok', data: { uptime: process.uptime() } };
})

export default router