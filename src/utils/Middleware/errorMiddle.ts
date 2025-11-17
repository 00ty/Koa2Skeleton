import Logger from '../Logger';

export default async (ctx: any, next: any) => {
  try {
    await next();
  } catch (err: any) {
    const status = err?.status || 500;
    const message = err?.message || '服务器内部错误';
    Logger.error('请求处理异常', err);
    ctx.status = status;
    if (typeof (ctx as any).json === 'function') {
      (ctx as any).json(status, message, null);
    } else {
      ctx.type = 'application/json';
      ctx.body = { code: status, message, data: null };
    }
  }
}