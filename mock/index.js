/**
 * 1. 自动读取mock文件夹下的所有文件，合并所有api;
 * 2. 支持多级文件夹;
 * 3. 修改mock数据后，不需要重启开发环境;
 */

// 本文件在plugins/mock-middleware.js中执行，注意mockDir的路径
const fs = require('fs');
const path = require('path');

const mockDir = path.join(__dirname, '../mock');
const mockData = {
  GET: {},
  POST: {}
};

function readdirSync(dir, isRoot) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const info = fs.statSync(`${dir}/${file}`);

    if (info.isDirectory()) {
      readdirSync(`${dir}/${file}`, false);
    } else {
      if (!(isRoot && file === 'index.js')) {
        const moduleFile = eval(
          fs.readFileSync(`${dir}/${file}`, { encoding: 'utf8' }) || {},
        );

        Object.assign(mockData.GET, moduleFile.GET);
        Object.assign(mockData.POST, moduleFile.POST);
      }
    }
  });
}

readdirSync(mockDir, true);

module.exports = mockData;

