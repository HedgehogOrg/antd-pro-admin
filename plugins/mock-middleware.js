const fs = require('fs')
const path = require('path')


module.exports = async (req, res) => {
  const mockFile = path.join(__dirname, '../mock/index.js')

  if (fs.existsSync(mockFile)) {
    const mock = require('../mock/index.js')
    const { url, method } = req;
    if (mock[method] && mock[method][url]) {
      const result = mock[method][url]
      if (typeof result === 'function') {
        try {
          await result(req, res)
        } catch (error) {
          console.log(error);
        }
      } else {
        res.json(result);
      }
    }
  }
}
