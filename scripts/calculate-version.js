#!/usr/bin/env node

/**
 * 计算新版本号
 * 支持预发布版本（alpha）的递增
 *
 * 用法: node calculate-version.js <currentVersion> <versionType>
 * 示例: node calculate-version.js 0.0.1-alpha.4 patch
 */

/**
 * 递增版本号的基础部分
 * @param {string} version - 版本号（如 "0.0.1"）
 * @param {string} type - 版本类型 (patch/minor/major)
 * @returns {string} 递增后的版本号
 */
function incrementVersion(version, type) {
	const parts = version.split('.');
	let major = parseInt(parts[0]);
	let minor = parseInt(parts[1]);
	let patch = parseInt(parts[2].split('-')[0]);

	switch (type) {
		case 'major':
			major++;
			minor = 0;
			patch = 0;
			break;
		case 'minor':
			minor++;
			patch = 0;
			break;
		case 'patch':
			patch++;
			break;
	}

	return `${major}.${minor}.${patch}`;
}

/**
 * 计算新版本号
 * @param {string} currentVersion - 当前版本号
 * @param {string} versionType - 版本类型 (patch/minor/major)
 * @returns {string} 新版本号
 */
function calculateNextVersion(currentVersion, versionType) {
	if (!currentVersion) {
		throw new Error('当前版本号不能为空');
	}

	if (!['patch', 'minor', 'major'].includes(versionType)) {
		throw new Error('版本类型必须是 patch、minor 或 major');
	}

	let newVersion;

	if (currentVersion.includes('-')) {
		// 预发布版本
		const [baseVersion, preRelease] = currentVersion.split('-');

		if (preRelease && preRelease.startsWith('alpha.')) {
			// 如果选择 patch，只增加预发布号
			// 如果选择 minor 或 major，更新基础版本号
			if (versionType === 'patch') {
				const preNum = parseInt(preRelease.split('.')[1]) || 0;
				newVersion = `${baseVersion}-alpha.${preNum + 1}`;
			} else {
				// minor 或 major：更新基础版本号，重置预发布号
				const newBase = incrementVersion(baseVersion, versionType);
				newVersion = `${newBase}-alpha.0`;
			}
		} else {
			// 新的预发布版本
			const newBase = incrementVersion(baseVersion, versionType);
			newVersion = `${newBase}-alpha.0`;
		}
	} else {
		// 正式版本：转换为预发布版本
		const newBase = incrementVersion(currentVersion, versionType);
		newVersion = `${newBase}-alpha.0`;
	}

	return newVersion;
}

try {
	// 如果作为脚本直接运行
	if (import.meta.main) {
		const currentVersion = process.argv[2];
		const versionType = process.argv[3];

		if (!currentVersion || !versionType) {
			console.error(
				'Usage: node calculate-version.js <currentVersion> <versionType>',
			);
			console.error('Example: node calculate-version.js 0.0.1-alpha.4 patch');
			process.exit(1);
		}

		const newVersion = calculateNextVersion(currentVersion, versionType);
		console.log(newVersion);
	} else {
		console.log('run as not main module, ignore');
	}
} catch (error) {
	console.error('Error:', error.message);
	process.exit(1);
}

// 导出函数供其他模块使用
export default { calculateNextVersion, incrementVersion };
