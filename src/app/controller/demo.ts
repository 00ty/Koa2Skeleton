import { Context, Next } from 'koa';
import BaseController from './BaseController';
import DemoService, { demoService } from '../service/DemoService';


interface ResponseData {
  router?: string;
  list?: any[];
  count?: number;
  pageIndex?: number;
  pageSize?: number;
  totalPages?: number;
  [key: string]: any;
}

class DemoController extends BaseController {
  private service: DemoService;

  constructor(service: DemoService) {
    super();
    this.service = service;
  }
  /**
   * 测试接口
   * @param ctx Koa上下文
   * @param next 下一个中间件
   */
  public async test(ctx: Context, next: Next): Promise<void> {
    // 参数验证
    if (!this.validateParams(ctx, ['id'])) {
      return;
    }
    
    const { id } = ctx.query;
    
    try {
      // 使用服务层获取数据
      const result = await this.service.getUserById(id as string);

      if (!result) {
        return this.fail(ctx, '数据不存在', { router: 'login' }, 404);
      }
      
      this.success(ctx, result, '获取成功');
    } catch (error) {
      this.error(ctx, error, '测试接口异常');
    }
  }

  /**
   * 分页查询示例
   * @param ctx Koa上下文
   * @param next 下一个中间件
   */
  public async getPagedData(ctx: Context, next: Next): Promise<void> {
    try {
      // 获取分页参数
      const { pageIndex, pageSize } = this.getPaginationParams(ctx, 5);
      
      // 参数验证
      if (pageIndex < 1 || pageSize < 1) {
        return this.fail(ctx, '分页参数无效', { pageIndex, pageSize });
      }
      
      // 使用服务层获取分页数据
      const responseData = await this.service.getPagedData(pageIndex, pageSize);
      
      return this.success(ctx, responseData, '获取成功');
    } catch (error) {
      this.error(ctx, error, '分页查询异常');
    }
  }
}

export default new DemoController(demoService);