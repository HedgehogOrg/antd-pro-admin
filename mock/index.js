/**
 * 把需要 mock 的 API 加到下方即可
 * 删除 API 即不 mock
 * 可直接是json对象：{}
 * 也可以是自定义函数：async (req, res) => { res.status(200).end() }
 */
const { Login } = require('./Login');

module.exports = {
  GET: {
    ...Login.GET,
  },
  POST: {
    ...Login.POST,
  }
}
