import adminUserDao from './../dao/adminUser';

import models from './../model/x1';


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

  public async demo(ctx: any, next: Function) {

    let { page  = 1 } = ctx.query;
    let pageIndex = parseInt(page);
    let pageSize = 5;
    // 计算偏移量
    const offset = (pageIndex - 1) * pageSize;

    // 查询总记录数
    const count = await models.count();

    let ret = await models.findAll({
      limit: pageSize,
      offset: offset
    });

		let data = JSON.parse(JSON.stringify(ret));
    return ctx.json(200 , '获取成功', {
      list: data, count, pageIndex, pageSize
    });
  }
}

export default new DemoController();