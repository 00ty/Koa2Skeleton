import Router from 'koa-router';

const router = new Router()


import demoController from './../app/controller/demo';

router.get('/', demoController.test)
router.get('/demo', demoController.demo)

export default router