import adminUserDao from './../dao/adminUser';

class DemoController {
  public async test(ctx: any, next: Function) {
    let { id  = false } = ctx.query;

    if (!id || id == '') {
      return ctx.json(500 , '参数无效', { router: 'login' });
    }

    let r = await adminUserDao.find({id})

    if (!r) {
      return ctx.json(500 , '获取失败', { router: 'login' });
    }
    
    ctx.json(200 , '获取成功', r);
  }
}

export default new DemoController();