import { KoaResult } from './../../constants';

export default async (ctx: any, next: any) => {

    ctx.type = 'application/json';

    ctx.json = function (code: number,message: string, data: any) {
        ctx.body = new KoaResult(code, message , data);
    }
    /* ctx.failJson = function (data: any, message: string, code: number = 40004) {
        ctx.body = new KoaResult(code, message , data);
    }
    ctx.successJson = function (data: any, message: string, code: number = 0) {
        ctx.body = new KoaResult(code, message , data);
    } */
    await next();
}