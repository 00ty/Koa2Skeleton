export interface KoaResultInterface {
  code: number,
  message: string,
  data: any
}

export class KoaResult implements KoaResultInterface {
  code: number;
  message: string;
  data: any;

  constructor(code: number, message: string, data: any, ) {
      this.code = code;
      this.message = message;
      this.data = data;
  }
}