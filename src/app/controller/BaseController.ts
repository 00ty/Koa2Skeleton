import { Context, Next } from 'koa';
import Logger from '../../utils/Logger';

/**
 * 基础控制器类
 * 提供通用方法和属性，供其他控制器继承使用
 */
export default class BaseController {
  /**
   * 成功响应
   * @param ctx Koa上下文
   * @param data 响应数据
   * @param message 响应消息
   */
  protected success(ctx: Context, data: any = null, message: string = '操作成功'): void {
    ctx.json(200, message, data);
  }

  /**
   * 失败响应
   * @param ctx Koa上下文
   * @param message 错误消息
   * @param data 错误数据
   * @param code 错误码
   */
  protected fail(ctx: Context, message: string = '操作失败', data: any = null, code: number = 400): void {
    ctx.json(code, message, data);
  }

  /**
   * 服务器错误响应
   * @param ctx Koa上下文
   * @param error 错误对象
   * @param message 错误消息
   */
  protected error(ctx: Context, error: any, message: string = '服务器内部错误'): void {
    Logger.error(`[控制器错误] ${message}:`, error);
    ctx.json(500, message, null);
  }

  /**
   * 参数验证
   * @param ctx Koa上下文
   * @param requiredParams 必需参数列表
   * @returns 验证结果
   */
  protected validateParams(ctx: Context, requiredParams: string[]): boolean {
    const params = { ...ctx.query, ...(ctx.request as any).body };
    
    for (const param of requiredParams) {
      if (params[param] === undefined || params[param] === '') {
        this.fail(ctx, `参数 ${param} 不能为空`);
        return false;
      }
    }
    
    return true;
  }

  /**
   * 分页参数处理
   * @param ctx Koa上下文
   * @param defaultPageSize 默认每页条数
   * @returns 分页参数对象
   */
  protected getPaginationParams(ctx: Context, defaultPageSize: number = 10): { pageIndex: number; pageSize: number; offset: number } {
    const { page = '1', size = String(defaultPageSize) } = ctx.query;
    const pageIndex = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(size as string, 10) || defaultPageSize;
    
    return {
      pageIndex,
      pageSize,
      offset: (pageIndex - 1) * pageSize
    };
  }
}