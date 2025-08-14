const { DataTypes } = require('sequelize');
import Sequelize from './../../utils/Database';

export default Sequelize.define('x1', {
	id: {
		field: 'id',
		type: DataTypes.INTEGER, // 类型
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		field: 'name'
	},
	color : {
		type: DataTypes.STRING,
		field: 'color'
	},
},{
	timestamps: false, // 不添加时间字段
});