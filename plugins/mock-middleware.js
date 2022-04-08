const fs = require('fs')
const path = require('path')

// 获取不含查询参数的url
function getCleanUrl(url) {
  const idx = url.indexOf('?')

  return url.substring(0, idx === -1 ? url.length : idx)
}

module.exports = async (req, res) => {
  const mockFile = path.join(__dirname, '../mock/index.js')

  if (fs.existsSync(mockFile)) {
    const mock = eval(fs.readFileSync(mockFile, { encoding: 'utf8' }) || {});
    const { url, method } = req;
    // get请求截取'?'前的url，否则url无法匹配
    let cleanUrl = url
    if (method.toLowerCase() === 'get') {
      cleanUrl = getCleanUrl(url)
    }

    if (mock[method] && mock[method][cleanUrl]) {
      const result = mock[method][cleanUrl]

      if (typeof result === 'function') {
        try {
          await result(req, res)
        } catch (error) {
          console.log(error);
        }
      } else {
        res.json(result);
      }
    } else {
      // 请求的url不存在
      res.status(404).send('404 Not Found')
    }
  }
}
