/**
 * 基础服务类
 * 提供通用的服务方法，供其他服务继承使用
 */
export default class BaseService {
  /**
   * 处理数据库查询结果
   * @param result 数据库查询结果
   * @returns 处理后的结果
   */
  protected formatResult(result: any): any {
    if (!result) return null;
    return typeof result.toJSON === 'function' ? result.toJSON() : result;
  }

  /**
   * 处理数据库查询结果列表
   * @param results 数据库查询结果列表
   * @returns 处理后的结果列表
   */
  protected formatResults(results: any[]): any[] {
    if (!results || !Array.isArray(results)) return [];
    return results.map(item => this.formatResult(item));
  }

  /**
   * 构建分页结果
   * @param list 数据列表
   * @param count 总记录数
   * @param pageIndex 当前页码
   * @param pageSize 每页条数
   * @returns 分页结果对象
   */
  protected buildPaginationResult(list: any[], count: number, pageIndex: number, pageSize: number): any {
    return {
      list,
      count,
      pageIndex,
      pageSize,
      totalPages: Math.ceil(count / pageSize)
    };
  }

  /**
   * 处理服务层异常
   * @param error 错误对象
   * @param serviceName 服务名称
   * @param methodName 方法名称
   * @throws 抛出处理后的错误
   */
  protected handleError(error: any, serviceName: string, methodName: string): never {
    const errorMessage = `[Service Error] ${serviceName}.${methodName}: ${error.message || 'Unknown error'}`;
    const Logger = require('../../utils/Logger').default;
    Logger.error(errorMessage, error);
    
    // 重新抛出错误，让控制器捕获处理
    throw error;
  }
}