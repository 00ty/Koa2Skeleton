import { configure, getLogger } from 'log4js';

configure({
	appenders: {
		// 选择打印到控制台
		ruleConsole: {
			type: 'console'
		},
		// 文件日志
		ruleFile: {
			type: 'dateFile',
			// 这个目录是相对于根目录的，即与app.js 是同一级的
			filename: 'logs/server',
			pattern: 'yyyy-MM-dd.log',
			// 最大大小
			maxLogSize: 10 * 1000 * 1000,
			numBackups: 3,
			// 是否异步读写
			alwaysIncludePattern: true
		}
	},
	categories: {
		default: {
			appenders: ['ruleConsole', 'ruleFile'],
			level: 'info'
		}
	}
});

export default getLogger('app');