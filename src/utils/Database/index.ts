import { Sequelize } from 'sequelize';

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

sequelize.authenticate()
  .then(() => {
    global.logger.info('数据库连接成功');
  })
  .catch((err:Error) => {
    global.logger.error('数据库连接失败 -> ' , err.message);
    process.exit();
  })

export default sequelize;