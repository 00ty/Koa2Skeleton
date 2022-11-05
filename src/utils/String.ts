import { createHash } from 'crypto';
import internal from 'stream';

export function MD5(data): string {
  return createHash('md5').update(data.toString(), 'utf8').digest('hex');
}

export function Check(require: any, data: any): boolean {
  for (let key of require) {
      if (key in data) {
          continue;
      } else {
          return false;
      }
  }
  return true;
}
