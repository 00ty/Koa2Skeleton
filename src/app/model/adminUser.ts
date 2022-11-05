const { DataTypes } = require('sequelize');

import Sequelize from './../../utils/Database';

const AdminUser = Sequelize.define('bot_admin', {
	id: {
		field: 'id',
		type: DataTypes.INTEGER, // 类型
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
		field: 'username'
	},
	password : {
		type: DataTypes.STRING,
		field: 'password'
	},
	nickname: {
		type: DataTypes.STRING,
		field: 'nickname'
	},
  token: {
		type: DataTypes.STRING,
		field: 'token'
	},
	status : {
		type: DataTypes.INTEGER,
		field: 'status'
	},
  create_time : {
		type: DataTypes.DATE,
		field: 'create_time'
	},
  update_time : {
		type: DataTypes.DATE,
		field: 'update_time'
	}
},{
	timestamps: false, // 不添加时间字段
});

export default AdminUser;