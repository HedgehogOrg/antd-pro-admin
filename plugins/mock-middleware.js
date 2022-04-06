const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
  const mockFile = path.join(__dirname, '../mock/mock-data.js')

  if (fs.existsSync(mockFile)) {
    // eslint-disable-next-line no-eval
    const mock = eval(
      fs.readFileSync(mockFile, { encoding: 'utf8' }) || {},
    );
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
