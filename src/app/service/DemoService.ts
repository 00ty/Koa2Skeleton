import BaseService from './BaseService';
import adminUserDao from '../dao/adminUser';
import models from '../model/x1';

/**
 * 演示服务类
 * 处理与演示相关的业务逻辑
 */
export default class DemoService extends BaseService {
  /**
   * 根据ID查询用户信息
   * @param id 用户ID
   * @returns 用户信息
   */
  public async getUserById(id: string | number): Promise<any> {
    try {
      const result = await adminUserDao.find({ id });
      return result || null;
    } catch (error) {
      this.handleError(error, 'DemoService', 'getUserById');
    }
  }

  /**
   * 获取分页数据
   * @param pageIndex 页码
   * @param pageSize 每页条数
   * @returns 分页数据
   */
  public async getPagedData(pageIndex: number, pageSize: number): Promise<any> {
    try {
      const offset = (pageIndex - 1) * pageSize;

      // 并行查询总记录数和分页数据
      const [count, results] = await Promise.all([
        models.count(),
        models.findAll({
          limit: pageSize,
          offset: offset
        })
      ]);

      // 格式化结果
      const formattedResults = this.formatResults(results);
      
      // 构建分页结果
      return this.buildPaginationResult(formattedResults, count, pageIndex, pageSize);
    } catch (error) {
      this.handleError(error, 'DemoService', 'getPagedData');
    }
  }
}

// 导出服务实例
export const demoService = new DemoService();