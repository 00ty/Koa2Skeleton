// const models = require('./../../models/AdminUser');

import models from './../model/adminUser';

export default class DaoAdminUser {
	// 查询
	static async find(query) {
		let ret = await models.findOne({
			where: {
				...query
			}
		});
		let data = JSON.parse(JSON.stringify(ret));
		if (data === null) {
			return false;
		}
		return data;
	}
}