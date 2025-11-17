import { Sequelize } from 'sequelize';
import Logger from '../Logger';

const sequelize = new Sequelize(
  process.env.DB_MYSQL_DBNAME ?? 'test',
  process.env.DB_MYSQL_USER ?? 'root',
  process.env.DB_MYSQL_PASSWORD ?? 'root', {
		host: process.env.DB_MYSQL_HOST ?? '127.0.0.1',
		dialect: 'mysql',
    define: {
      freezeTableName: true
    }
		// logging: false, // 取消日志
	}
);

export async function initDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    Logger.info('数据库连接成功');
  } catch (err: any) {
    Logger.error('数据库连接失败 ->', err?.message || err);
    throw err;
  }
}

export default sequelize;