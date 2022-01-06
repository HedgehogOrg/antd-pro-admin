const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
  const mockFile = path.join(__dirname, 'mock-data.js')
  if (fs.existsSync(mockFile)) {
    const mock = eval(
      fs.readFileSync(mockFile, { encoding: 'utf8' }) || {},
    );
    const { url } = req;
    if (mock[url]) {
      res.json(mock[url]);
    }
  }
}
